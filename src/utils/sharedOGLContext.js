/**
 * sharedOGLContext — singleton OGL Renderer shared across all RippleGrid instances.
 * Avoids hitting per-browser WebGL context limits on mobile by using one
 * WebGL context for all grid shaders instead of one per card.
 *
 * Each grid instance creates a 2D display canvas; the shared WebGL canvas
 * is rendered into and then copied via drawImage() — a GPU compositing op.
 */

import { Renderer } from 'ogl'

let sharedRenderer = null
let initialized = false

export function getSharedRenderer() {
  if (!sharedRenderer) {
    sharedRenderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    })

    // Must be in the DOM for drawImage() to work reliably across browsers.
    // Position off-screen so it's never visible.
    const canvas = sharedRenderer.gl.canvas
    canvas.style.position = 'absolute'
    canvas.style.top = '-9999px'
    canvas.style.left = '0'
    canvas.style.width = '1px'
    canvas.style.height = '1px'
    canvas.style.pointerEvents = 'none'
    document.body.appendChild(canvas)
    initialized = true

    // Enable blending
    const gl = sharedRenderer.gl
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  }
  return sharedRenderer
}

/**
 * Create a display canvas (2D) for a RippleGrid instance.
 * The returned canvas should be appended to the grid's container.
 */
export function createDisplayCanvas() {
  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.display = 'block'
  return canvas
}

/**
 * Size a display canvas to match its container's CSS dimensions at device-pixel ratio.
 * Returns { width, height } in CSS pixels.
 */
export function sizeDisplayCanvas(canvas, container) {
  const { clientWidth: w, clientHeight: h } = container
  const dpr = Math.min(window.devicePixelRatio, 2)
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  return { width: w, height: h }
}

/**
 * Render a scene mesh onto the shared WebGL canvas, then copy to
 * the given display canvas via drawImage().
 */
export function renderToDisplay(renderer, mesh, displayCanvas, cssWidth, cssHeight) {
  const dpr = Math.min(window.devicePixelRatio, 2)
  const gl = renderer.gl

  // Resize shared canvas to match the card's dimensions at device-pixel resolution
  const pixelW = Math.round(cssWidth * dpr)
  const pixelH = Math.round(cssHeight * dpr)
  if (gl.canvas.width !== pixelW || gl.canvas.height !== pixelH) {
    renderer.setSize(pixelW, pixelH)
  } else {
    gl.viewport(0, 0, pixelW, pixelH)
  }

  // Render the grid shader
  renderer.render({ scene: mesh })

  // Copy to the 2D display canvas
  const ctx = displayCanvas.getContext('2d')
  ctx.clearRect(0, 0, cssWidth, cssHeight)
  ctx.drawImage(gl.canvas, 0, 0, cssWidth, cssHeight)
}
