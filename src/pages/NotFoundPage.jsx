import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section>
      <h2 className="section-title">404</h2>
      <p className="muted">No page here.</p>
      <Link to="/">Back to vendors</Link>
    </section>
  )
}

export default NotFoundPage
