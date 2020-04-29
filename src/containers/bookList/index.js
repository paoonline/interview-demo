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
    title: 'ชื่อ',
    dataIndex: 'name',
    key: 'name',
},
{
    title: 'วันที่อ่านจบ',
    dataIndex: 'timeRead',
    key: 'timeRead',
},
{
    title: 'ชื่อคนเขียน',
    dataIndex: 'nameAuthor',
    key: 'nameAuthor',
},
{
    title: 'ระยะเวลาที่ให้ในการอ่าน(วัน)',
    dataIndex: 'dateReadEnd',
    key: 'dateReadEnd',
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

    goToManageBook = () => {
        this.props.history.push('/manage-read')
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
                    deleteListId: <Icon type="close" onClick={() => this.handleDelete(val)} style={{ color: 'red', cursor: 'pointer' }} />
                }
            }
        ): []
        return(
            <div className='flex'>
                <div className="site-card-border-less-wrapper">
                    <Card title="Book List" bordered={false} extra={<div className='new' onClick={() => this.goToManageBook()}>NEW</div>}>
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
