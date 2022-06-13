import React from 'react';
import { Link } from 'react-router-dom';

interface InjectedProps {
    to: string;
}

const RightAlignedLink: React.FC<InjectedProps> = ({to, children}) => {
    return (
        <div className="Aligner">
            <Link className="StyledLink" to={to}>{children}</Link>
        </div>
    );
}


export default RightAlignedLink;