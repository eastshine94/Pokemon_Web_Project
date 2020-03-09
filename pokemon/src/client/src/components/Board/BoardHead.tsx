import React from 'react';

const BoardHead: React.SFC = () => {
    return (
        <thead>
            <tr>
                <th className= "colNo">No</th>
                <th className="colTitle">Title</th>
                <th className="colWriter">Writer</th>
                <th className="colDate">Date</th>
            </tr>
        </thead>
    )
}

export default BoardHead;
