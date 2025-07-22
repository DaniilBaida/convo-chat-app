import * as React from "react";

export function Loader({ className = "", ...props }) {
    return (
        <span
            className={
                "inline-block animate-spin rounded-full border-2 border-gray-300 border-t-primary size-6 " +
                className
            }
            role="status"
            aria-label="Loading"
            {...props}
        />
    );
}
