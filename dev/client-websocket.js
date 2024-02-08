// https://adamcoster.com/blog/create-a-live-reload-server-for-front-end-development

;(() => {
  const socketUrl = 'ws://localhost:8090'
  let socket = new WebSocket(socketUrl)
  socket.addEventListener('close', () => {
    // Then the server has been turned off,
    // either due to file-change-triggered reboot,
    // or to truly being turned off.

    // Attempt to re-establish a connection until it works,
    // failing after a few seconds (at that point things are likely
    // turned off/permanantly broken instead of rebooting)
    const interAttemptTimeoutMilliseconds = 100
    const maxDisconnectedTimeMilliseconds = 3000
    const maxAttempts = Math.round(
      maxDisconnectedTimeMilliseconds / interAttemptTimeoutMilliseconds
    )
    let attempts = 0
    const reloadIfCanConnect = () => {
      attempts++
      if (attempts > maxAttempts) {
        console.error('Could not reconnect to dev server.')
        return
      }
      socket = new WebSocket(socketUrl)
      socket.addEventListener('error', () => {
        setTimeout(reloadIfCanConnect, interAttemptTimeoutMilliseconds)
      })
      socket.addEventListener('open', () => {
        location.reload()
      })
    }
    reloadIfCanConnect()
  })
})()
