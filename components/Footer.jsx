import { Github, Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <aside className="items-center grid-flow-col">
                <p>Copyright © 2024 - Made by <a className="underline font-bold" href="https://fabian-kleine.dev/" target="_blank">Fabian Kleine</a></p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="https://fabian-kleine.dev/" target="_blank"><Globe /></a>
                <a href="https://github.com/Fabian-Kleine/wishlist" target="_blank"><Github /></a>
            </nav>
        </footer>
    )
}