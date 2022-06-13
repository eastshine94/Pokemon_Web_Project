import React from 'react';
import {NoticeCategory} from '../../../../shared/types/NoticeType';
interface Props {
    category: NoticeCategory;
    title: string;
}

const NoticePost: React.SFC<Props> = ({category, title}) => {
    return (
      
        <div className="noticePost">
            <span className={`category ${category}`}>{category}</span>
            <span className="noticePostTitle">{title}</span>
        </div>
      
    )
}

export default NoticePost;