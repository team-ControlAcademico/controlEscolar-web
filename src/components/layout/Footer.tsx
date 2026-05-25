export function Footer() {
  return (
    <footer className="mt-12 border-t border-stone-200 bg-stone-100/60 px-5 py-6 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Control Escolar. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          <a href="#" className="text-xs text-neutral-500 transition-colors hover:text-primary-600">
            Documentación
          </a>
          <a href="#" className="text-xs text-neutral-500 transition-colors hover:text-primary-600">
            Soporte
          </a>
          <a href="#" className="text-xs text-neutral-500 transition-colors hover:text-primary-600">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
