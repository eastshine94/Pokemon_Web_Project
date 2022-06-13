import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';

interface InjectedProps{
    blockClassName: string;
    image: string,
    name: string,
    id: number;
}

const PreNext: React.FC<InjectedProps> = ({blockClassName, image, name, id }) => {
    return (
        <Link to={`${PAGE_PATHS.POKEDEX}/detail/${id}`} className={blockClassName}>
            <img className="preNextImage" src={image} alt={name} />
            <div className="preNextName">{name}</div>
            <div className="preNextId">No. {String(id).padStart(3,"0")}</div>
        </Link>

    )
}


export default PreNext;