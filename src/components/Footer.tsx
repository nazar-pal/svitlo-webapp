import { Separator } from '@heroui/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="text-muted mt-20 px-4 pt-10 pb-14">
      <Separator className="mb-10" />
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} Svitlo. All rights reserved.
        </p>
        <p className="text-muted m-0 text-xs font-semibold tracking-widest uppercase">
          Built with Svitlo
        </p>
      </div>
    </footer>
  )
}
