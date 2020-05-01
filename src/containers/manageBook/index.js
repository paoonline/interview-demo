import React, {Component} from 'react'
import { 
  Form,
  Input,
  Button,
  DatePicker,
  Card,
  Upload
} from 'antd';
import './book.css'
import { connect } from 'react-redux'
import { BookReadAsync, BookReadUpdateAsync } from '../../modules/book'
import { withRouter } from 'react-router-dom'

 class ManageBook extends Component {

  constructor(props){
    super(props)
    this.state = {
      bookEdit: null
    }
  }

  componentDidMount() {
    const { book, history } = this.props
    let params, getBookEdit
    if(history.location.search ){
      params = history.location.search && parseInt(history.location.search.replace('?id=', ''))
      getBookEdit = book.list.find(val => val.id === params)
      this.setState({
        bookEdit : getBookEdit
      })
    }
  }

  handleSubmit = e => {
    const { book, Read, Update } = this.props
    const { bookEdit } = this.state
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(bookEdit){
        let newBookList = await book.list.map(val => {
          let newData = val
          if(val.id === bookEdit.id){
            newData = {
              id: val.id,
              timeRead: values.timeRead,
              nameAuthor: values.nameAuthor,
              name: values.name,
              imageCover: values.imageCover.hasOwnProperty('fileList') ? values.imageCover.fileList : values.imageCover,
              dateReadEnd: values.dateReadEnd
            }
          }
          return newData
        })
        Update(newBookList)
      }else{
        Read({
          id: new Date() * 1,
          timeRead: values.timeRead,
          nameAuthor: values.nameAuthor,
          name: values.name,
          imageCover: values.imageCover.fileList,
          dateReadEnd: values.dateReadEnd
        })
      }
    })
  };

  uploadImg = (e) => {
    return {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
      defaultFileList:  e ? e.imageCover : [] 
      ,
      showUploadList: {
        showDownloadIcon: true,
        downloadIcon: 'download ',
        showRemoveIcon: true,
      },
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form
    const { status, history, book } = this.props
    const { bookEdit } = this.state

    if(status) {
      history.push('/book-read')
    }
    return (
      <div className='flex'>
        <div className="site-card-border-less-wrapper">
          <Card title="Manage Book" bordered={false}>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                name="name"
                label="ชื่อหนังสือ"
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                  initialValue: bookEdit ? bookEdit.name: null,
                })(
                  <Input placeholder="ชื่อหนังสือ" />
                )}
              </Form.Item>
  
              <Form.Item
                name="dateReadEnd"
                label="วันที่อ่านจบ"
              >
                {getFieldDecorator('dateReadEnd', {
                  rules: [{ required: true, message: 'Please input your date read end!' }],
                  initialValue: bookEdit ? bookEdit.dateReadEnd: null,
                })(
                  <DatePicker />
                )}
              </Form.Item>
  
              <Form.Item
                name="nameAuthor"
                label="ชื่อคนเขียน"
              >
                {getFieldDecorator('nameAuthor', {
                  rules: [{ required: true, message: 'Please input your author!' }],
                  initialValue: bookEdit ? bookEdit.nameAuthor: null,
                })(
                  <Input placeholder="ชื่อคนเขียน" />
                )}
              </Form.Item>
  
              <Form.Item
                name="timeRead"
                label=" ระยะเวลาที่ให้ในการอ่าน(วัน)"
              >
                {getFieldDecorator('timeRead', {
                  rules: [{ required: true, message: 'Please input your time read!' }],
                  initialValue: bookEdit ? bookEdit.timeRead: null,
                })(
                  <Input placeholder=" ระยะเวลาที่ให้ในการอ่าน(วัน)" type="number"/>
                )}
              </Form.Item>
              <Form.Item
                name="imageCover"
                label="ภาพหน้าปก"
              >
                {this.state.bookEdit !== null &&
                getFieldDecorator('imageCover', {
                  rules: [{ required: true, message: 'Please input your time image cover!' }],
                  initialValue: bookEdit ? bookEdit.imageCover: null,
                })(
                <Upload {...this.uploadImg(this.state.bookEdit)}>
                  <Button>
                    Upload
                  </Button>
                </Upload>
                )}
              </Form.Item>
  
              <Form.Item>
                {
                  book.loading ? <div>LOADING</div>:
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                }
              </Form.Item>
            </Form>
        </Card>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  Read : param => dispatch(BookReadAsync(param)),
  Update : param => dispatch(BookReadUpdateAsync(param)),
})

const mapStateToProps = (state) => {
  return {
    book: state.book,
    status: state.book.status
  }
}

export default Form.create({ name: 'manageBook' })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageBook)))

