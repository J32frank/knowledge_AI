import React  from "react";
import Header from "./header";


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header/>
                {children}
            
            </body>
        </html>
    );
}