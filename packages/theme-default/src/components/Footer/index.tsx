const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-6 py-8 px-6 sm:p-8 w-full border-t border-solid border-divider-light">
      <div className="m-auto w-full text-center">
        <div className="font-meduim text-sm text-text-2">
          © 2015-{year} zhifou. Powered by{' '}
          <a href="https://rspress.dev/" target="_blank" rel="noreferrer">
            Rspress
          </a>
          .
        </div>
      </div>
    </footer>
  )
}

export default Footer
