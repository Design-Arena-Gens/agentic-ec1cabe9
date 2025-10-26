'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState('5')
  const [resolution, setResolution] = useState('1080p')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)
    setGeneratedVideo(null)

    // Simulate video generation with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 300)

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)

      // Generate a placeholder video (in real implementation, this would be from API)
      // Using a demo video URL for demonstration
      setGeneratedVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')

      setTimeout(() => {
        setIsGenerating(false)
      }, 500)
    }, 4000)
  }

  const handleDownload = () => {
    if (!generatedVideo) return

    const link = document.createElement('a')
    link.href = generatedVideo
    link.download = `sora-video-${Date.now()}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.logo}>
            <span className={styles.logoGradient}>Sora 2</span> Free
          </h1>
          <p className={styles.tagline}>
            🎬 Generate stunning AI videos • No watermark • Unlimited • Free forever
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.generatorCard}>
            <div className={styles.inputSection}>
              <label htmlFor="prompt" className={styles.label}>
                Describe your video
              </label>
              <textarea
                id="prompt"
                className={styles.textarea}
                placeholder="e.g., A serene sunset over a mountain lake with birds flying across the sky, cinematic lighting, 4K quality..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                disabled={isGenerating}
              />
            </div>

            <div className={styles.optionsGrid}>
              <div className={styles.option}>
                <label htmlFor="duration" className={styles.label}>
                  Duration
                </label>
                <select
                  id="duration"
                  className={styles.select}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={isGenerating}
                >
                  <option value="3">3 seconds</option>
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="20">20 seconds</option>
                  <option value="60">60 seconds</option>
                </select>
              </div>

              <div className={styles.option}>
                <label htmlFor="resolution" className={styles.label}>
                  Resolution
                </label>
                <select
                  id="resolution"
                  className={styles.select}
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  disabled={isGenerating}
                >
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                  <option value="4k">4K (Ultra HD)</option>
                </select>
              </div>
            </div>

            <button
              className={styles.generateButton}
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner}></span>
                  Generating... {Math.round(progress)}%
                </>
              ) : (
                <>
                  ✨ Generate Video
                </>
              )}
            </button>

            {isGenerating && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>

          {generatedVideo && !isGenerating && (
            <div className={styles.resultCard}>
              <h3 className={styles.resultTitle}>Your Video is Ready! 🎉</h3>
              <div className={styles.videoContainer}>
                <video
                  className={styles.video}
                  src={generatedVideo}
                  controls
                  autoPlay
                  loop
                  muted
                />
              </div>
              <button
                className={styles.downloadButton}
                onClick={handleDownload}
              >
                ⬇️ Download (No Watermark)
              </button>
              <p className={styles.freeLabel}>
                ✅ 100% Free • No Watermark • No Sign Up Required
              </p>
            </div>
          )}
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚀</div>
            <h3>Lightning Fast</h3>
            <p>Generate videos in seconds, not minutes</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💎</div>
            <h3>No Watermark</h3>
            <p>Crystal clear videos without any branding</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Unlimited Access</h3>
            <p>Generate as many videos as you want</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔓</div>
            <h3>No Restrictions</h3>
            <p>Full creative freedom, no limitations</p>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>Powered by advanced AI technology • Free forever • No account needed</p>
        </footer>
      </div>
    </main>
  )
}
