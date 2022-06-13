import { observable, action } from 'mobx';
import axios from 'axios';
import { ApiResponse } from '../types';
import { NoticeCategory } from '../../../../shared/types/NoticeType'

interface NoticeDto {
    id: number;
    title: string;
    contents: string;
    category: NoticeCategory;
}

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export default class NoticeStore {
    @observable notices: Array<NoticeDto> = [];

    @action
    getAllNotice = async() => {
        const notices:ApiResponse<Array<NoticeDto>> = await axios.get(`${API_HOST}/notice`);     
        await this.setNotices(notices.data.data);
    }

    @action
    setNotices = (notices: Array<NoticeDto>) => {
        this.notices = notices;
    }
} 