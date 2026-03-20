export default function Footer() {
  return (
    <footer className="py-10 bg-muted/50 border-t border-border text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Built with security in mind —{' '}
            <span className="font-semibold text-gradient-neon inline-block">
              DevSecOps Portfolio
            </span>{' '}
            © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
