import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { BookLists, BookDelete } from '../../modules/book'
import './book.css'
import { 
    Table,
    Card,
    Icon
  } from 'antd';

const columns = [
{
    title: 'ชื่อหนังสือ',
    dataIndex: 'name',
    key: 'name',
},
{
    title: 'วันที่อ่านจบ',
    dataIndex: 'dateReadEnd',
    key: 'dateReadEnd',
},
{
    title: 'ชื่อคนเขียน',
    dataIndex: 'nameAuthor',
    key: 'nameAuthor',
},
{
    title: 'ระยะเวลาที่ให้ในการอ่าน(วัน)',
    dataIndex: 'timeRead',
    key: 'timeRead',
},
{
    title: 'ลบ',
    dataIndex: 'deleteListId',
    key: 'deleteListId',
},
];

class BookList extends Component {
    constructor(props) {
        super(props)
        this.props.listBook()
    }

    goToManageBook = (id) => {
        let idEdit = id ? id : null 
        this.props.history.push(`/manage-read?id=${idEdit}`)
    }

    handleDelete = (parms) => {
        const { data, bookReadDelete } = this.props
        let newData = data.list.filter(val => val.id !== parms.id)
        bookReadDelete(newData)
    }
    render () {
        let listBook = this.props.data.list.length > 0 ? this.props.data.list.map((val,i) => 
            {
                let newDate = new Date(val.dateReadEnd).toLocaleDateString()
                return {
                    ...val,
                    key: i,
                    dateReadEnd: newDate,
                    deleteListId: <Icon type="close" onClick={() => this.handleDelete(val)} style={{ color: 'red', cursor: 'pointer' }} />,
                    name: <div className='pointer' onClick={() => this.goToManageBook(val.id)}>{val.name}</div>
                }
            }
        ): []
        return(
            <div className='flex'>
                <div className="site-card-border-less-wrapper">
                    <Card title="Book List" style={{width:'100%'}} bordered={false} extra={<div className='new' onClick={() => this.goToManageBook()}>NEW</div>}>
                        <Table dataSource={listBook} columns={columns} />
                    </Card>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    listBook : param => dispatch(BookLists()),
    bookReadDelete : param => dispatch(BookDelete(param)),
  })
  

const mapStateToProps = (state) => {
    return {
        data: state.book
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList))
