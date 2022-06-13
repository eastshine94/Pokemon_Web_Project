import React from 'react';

const NullPage: React.FC = () => {
    return(
        <div className="nullPage">
            <p className="infoTitle">No Pokemon Matched Your Search!</p>
            <span className="suggestion">Try these Suggestions to find a pokemon : </span>
            <ul>
                <li>
                    <span className="suggestion_content">Reduce the number of search parameters</span>
                </li>
                <li>
                    <span className="suggestion_content">You can search for Pokemon by entering type in the search parameters.</span>
                </li>
                <li>
                    <span className="suggestion_content">Change regions options.</span>
                </li>
            </ul>
        </div>
    );
}

export default NullPage;