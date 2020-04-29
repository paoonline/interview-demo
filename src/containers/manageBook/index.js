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
import { BookReadAsync } from '../../modules/book'
import { withRouter } from 'react-router-dom'

 class ManageBook extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.Read({
        id: new Date() * 1,
        timeRead: values.timeRead,
        nameAuthor: values.nameAuthor,
        name: values.name,
        imageCover: values.imageCover.file.response.url,
        dateReadEnd: values.dateReadEnd
      })
    })
  };

  uploadImg = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [

    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'download ',
      showRemoveIcon: true,
    },
  };
  render() {
    const { getFieldDecorator } = this.props.form
    const { status, history, book } = this.props
    
    if(status) {
      history.push('/book-read')
    }
    return (
      <div className='flex'>
        <div className="site-card-border-less-wrapper">
          <Card title="Manage Book" bordered={false} style={{ width: 300 }}>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                name="name"
                label="ชื่อ"
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                })(
                  <Input placeholder="ชื่อ" />
                )}
              </Form.Item>
  
              <Form.Item
                name="dateReadEnd"
                label="วันที่อ่านจบ"
              >
                {getFieldDecorator('dateReadEnd', {
                  rules: [{ required: true, message: 'Please input your date read end!' }],
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
                })(
                  <Input placeholder="ชื่อคนเขียน" />
                )}
              </Form.Item>
  
              <Form.Item
                name="timeRead"
                label="ระยะเวลาในการอ่าน(วัน)"
              >
                {getFieldDecorator('timeRead', {
                  rules: [{ required: true, message: 'Please input your time read!' }],
                })(
                  <Input placeholder="ชื่อคนเขียน" />
                )}
              </Form.Item>
  
              <Form.Item
                name="imageCover"
                label="ภาพหน้าปก"
              >
                {getFieldDecorator('imageCover', {
                  rules: [{ required: true, message: 'Please input your time image cover!' }],
                })(
                <Upload {...this.uploadImg}>
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
})

const mapStateToProps = (state) => {
  return {
    book: state.book,
    status: state.book.status
  }
}

export default Form.create({ name: 'manageBook' })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageBook)))

