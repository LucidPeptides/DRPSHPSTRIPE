export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold mb-4">404 – Lost in the Lab</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Looks like this page didn’t make it through quality control.  
        It’s either been moved, discontinued… or it’s still in the freezer.
      </p>
      <a
        href="/"
        className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Back to Safety
      </a>
    </main>
  )
}
