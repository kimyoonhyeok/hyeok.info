import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";

export default function HomePage() {
    return (
        <>
            {/* 
         Structure mimics main/index.html responsive divs.
         But we use CSS Modules to toggle visibility or grid placement.
         The legacy CSS used .mobile-only classes (minWidth320).
         We will use a single implementation and use CSS Modules media queries 
         to resize/reposition the image.
      */}
            <div className={styles.enterance}>
                <Link href="/works">
                    {/* Legacy had id="enterance01" on img */}
                    {/* Using unoptimized to prevent Next.js adding span wrappers that break grid centering if not careful */}
                    <Image
                        id="enterance01"
                        src="/enternace.01.jpg"
                        alt="no image"
                        width={800}
                        height={600}
                        priority
                        unoptimized // For strict CSS compliance with legacy
                    />
                </Link>
            </div>
        </>
    );
}
