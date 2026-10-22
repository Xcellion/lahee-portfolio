import site from '../../content/site.json'

export default function useConstants() {
  return {
    RESUME_URL: site.resume,
    LINKEDIN_URL: site.linkedin,
    EMAIL: site.email,
  }
}
