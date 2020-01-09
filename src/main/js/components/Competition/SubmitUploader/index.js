import { Upload, Button, Icon } from 'antd';
import React from 'react';
import {uploadSubmit} from '../../../util/APIUtils';
import {notification} from 'antd'

class SubmitUploader extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        uploadSubmit(fileList[0], this.props.uploadUrl).then(
            response => {
                console.log(response);
                if (response.status === 201) {
                    this.setState({
                        fileList: [],
                        uploading: false,
                    });
                    notification.success({
                        message: 'Gate',
                        description: 'upload successfully.'
                    });
                } else {
                    this.setState({
                        uploading: false,
                    });
                    notification.error({
                        message: 'Gate',
                        description: response.statusText
                    });
                }
            }
        )
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}


export default SubmitUploader;