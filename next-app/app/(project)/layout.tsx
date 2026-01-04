export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We return children directly because the Page component will handle the root Grid container.
    // If we wrapped it here, we'd have to pass props or context to get the Header/Footer 
    // to align perfectly if they were siblings in the grid.
    // Since Page will render the entire Grid including Header/Footer, strictly following SCSS,
    // this layout is a pass-through.
    return <>{children}</>;
}
