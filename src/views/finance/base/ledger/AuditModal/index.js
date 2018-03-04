import React, { Component } from 'react';
import { Dialog, Input } from 'element-react';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import './modal.less';

/*
    可传参数
    props: {
        title: 
        onCancel: 取消回掉事件
        onOk： 确定回掉事件

    }
*/
class Modal extends Component {

	render() {

		let { title, toast, onCancel, onOk } = this.props;

		return <Dialog
			closeOnClickModal={false}
			visible={true}
			size="tiny"
			top={'40%'}
			title={title}
			onCancel={() => {
				onCancel && onCancel()
			}}
			customClass='my-dialog'
		>
			<Dialog.Body>
				{this.props.children}
			</Dialog.Body>
			<Dialog.Footer className="dialog-footer">
				<WhiteButton onClick={() => {
					onCancel && onCancel()
				}}>取消</WhiteButton>
				<PurpleButton onClick={() => {
					onOk && onOk();
				}}>确定</PurpleButton>
			</Dialog.Footer>
		</Dialog>
	}
}

export default Modal