import clsx from 'clsx';
import { ReactNode } from 'react';

interface ComponentProps {
    children: ReactNode;
    className?: string
}

interface SubComponentProps {
    children: ReactNode;
    className?: string
}

const List = ({ children, className }: ComponentProps) => {
    return (
        <div className={clsx("my-4 p-2 w-auto bg-base-200 rounded-lg", className)}>
            {children}
        </div>
    );
};

List.Header = ({ children }: SubComponentProps) => {
    return children;
};

List.List = ({ children, className }: SubComponentProps) => {
    return (
        <ul className={clsx("p-4 grid justify-items-center grid-list", className)}>
            {children}
        </ul>
    );
};

export default List;