/**
 * Production Video Lifecycle Management Engine
 * Handles programmatic auto-play verification and media load guarantees.
 */
document.addEventListener("DOMContentLoaded", () => {
  const backgroundVideo = document.getElementById("bg-video");

  if (!backgroundVideo) {
    console.error("Infrastructure Error: Target element #bg-video was not detected in the DOM structure.");
    return;
  }

  // Monitor playback integrity status
  const playPromise = backgroundVideo.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Video playing successfully. Smoothly phase in opacity to hide loading pixelation.
        backgroundVideo.style.opacity = "1";
        console.log("Core Media Engine: Background loop initialized smoothly.");
      })
      .catch((browserError) => {
        // Autoplay restricted due to device policies (e.g., Low Power Mode)
        console.warn(
          "Core Media Engine: Autoplay restriction enforced by layout client. Initializing fallback stack.",
          browserError
        );
        
        // Execute visual fail-safe: Keep layout crisp, rely safely on the fallback poster image
        backgroundVideo.classList.add("media-play-restricted");
      });
  }
});