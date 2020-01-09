import { Upload, Button, Icon } from 'antd';
import React from 'react';
import {uploadSubmit} from '../../../util/APIUtils';

class SubmitUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
    }

    handleChange = info => {
        console.log(info);
        let fileList = [...info.fileList];

        fileList = fileList.slice(-1);

        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };

    customRequest = ({onSuccess, onError, file, data}) => {
        let response = uploadSubmit(file, this.props.uploadUrl);
        console.log(file);
        console.log(data);
        let reader = new FileReader();
        console.log(typeof file);
        reader.readAsText(file);
        console.log(reader.result);
        if (!response.ok) {
            onError();
        } else {
            onSuccess(response, file);
        }
    };


    render() {
        const props = {
            customRequest: this.customRequest,
            onChange: this.handleChange,
            multiple: false,
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        );
    }
}

export default SubmitUploader;