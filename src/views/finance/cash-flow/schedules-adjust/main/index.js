import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Select, DatePicker, Input, AutoComplete, Button, Icon, Table, Checkbox } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import moment from 'moment';
import './index.less';

const Option = Select.Option;
const RangeDatePicker = DatePicker.RangePicker;
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD hh:mm:ss';

@inject('adjustMainCashStore') @observer
class MainAdjust extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startValue: null,
			endValue: null,
			endOpen: false,
			currPage: 1,
			pageSize: 5,
			checkedList: []
		}
	}

	componentWillMount() {

		console.log(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate())
	}

	handleCurrPageChange = (currPage, currPageSize) => {
		this.setState({
			currPage: currPage,
			pageSize: currPageSize
		});
	}


	render() {
		const { startValue, endValue, endOpen } = this.state;
		let columns = [
			{
				title: '日期',
				dataIndex: 'date',
				index: 'date'
			}, {
				title: '凭证字',
				dataIndex: 'certifyWord',
				index: 'certifyWord'
			}, {
				title: '凭证号',
				dataIndex: 'certifyNum',
				index: 'certifyNum'
			}, {
				title: '科目编码',
				dataIndex: 'subjectNO',
				index: 'subjectNO'
			}, {
				title: '科目名称',
				dataIndex: 'subjectName',
				index: 'subjectName'
			}, {
				title: '借方金额',
				dataIndex: 'creditAmount',
				index: 'creditAmount'
			}, {
				title: '贷方金额',
				dataIndex: 'debitAmount',
				index: 'debitAmount'
			}, {
				title: '主表项目',
				dataIndex: 'mainList',
				index: 'mainList'
			}, {
				title: '主表金额',
				dataIndex: 'mainAmount',
				index: 'mainAmount'
			}
		];
		return (
			<div className="main-adjust">
				<div className="search-container">
					<div>
						<div className="search-container-item">
							<h3>账簿</h3>
							<Select>
								{
									[{ NO: 1, name: 'a' }, { NO: 2, name: 'b' }].map(item => {
										return (
											<Option key={item.NO} value={item.NO + ''}>{item.name}</Option>
										)
									})
								}
							</Select>
						</div>
						<div className="search-container-item">
							<h3>币别</h3>
							<Select>
								{
									[{ NO: 1, name: 'a' }, { NO: 2, name: 'b' }].map(item => {
										return (
											<Option key={item.NO} value={item.NO + ''}>{item.name}</Option>
										)
									})
								}
							</Select>
						</div>
						<div className="search-container-item">
							<h3>起止日期</h3>
							<RangePicker
								defaultValue={[moment(new Date(), dateFormat), moment(moment().add(30, 'days'), dateFormat)]}
								onChange={(dates, datesString) => {
									// dates.map(date => {
									//   moment(date).format('YYYY-MM-DD HH:mm:ss');

									// });
									console.log(moment(dates[0]).format('YYYY-MM-DD HH:mm:ss'));
									console.log(moment(dates[1]).format('YYYY-MM-DD HH:mm:ss'));
								}}
							/>
						</div>
					</div>
					<div className="btns-container">
						<div className="search-container-item">
							<WhiteButton className="advanced-search"
								onMouseOver={() => {
									this.setState({
										showPop: true
									});
								}}
							>
								高级查询
								<Icon type="caret-down" />
								{this.state.showPop ? (
									<div className="clearLine"></div>
								) : null}
								{this.state.showPop ? (
									<div className="advanced-search-pop">
										<div>
											<div>
												<div className="certify-select">
													<p>多借多贷凭证</p>
													<Select>
														{[{ key: '1', val: '按金额相近匹配' }, { key: '2', val: '按金额比例匹配' }].map(item => {
															return <Option key={item.key}>{item.val}</Option>
														})}
													</Select>
												</div>

												<CheckboxGroup
													options={['显示禁用科目', '包含未过账凭证', '显示科目全名']}
													value={this.state.checkedList}
													onChange={(checkedList) => {
														this.setState({
															checkedList: checkedList
														});
													}}
												/>
											</div>
										</div>
										<div className="btns-confirm">
											<WhiteButton
												onClick={() => {
													this.setState({
														showPop: false
													});
												}}
											>
												取消
											</WhiteButton>
											<PurpleButton
												onClick={() => {
													this.setState({
														showPop: false
													});
												}}
											>
												确定
											</PurpleButton>
										</div>
									</div>
								) : null}
							</WhiteButton>
						</div>
						<div className="btn-container-group">
							<WhiteButton>刷新</WhiteButton>
							<WhiteButton className="reSplit">重新拆分凭证</WhiteButton>
							<WhiteButton>应用预设</WhiteButton>
							<PurpleButton>保存</PurpleButton>
						</div>
					</div>
				</div>
				<Table
					columns={columns}
					dataSource={[]}
					rowSelection={{
						onSelect: (record, selected, selectedRows) => {
							console.log(record, selected, selectedRows);
						}
					}}
					pagination={{
						defaultCurrent: 1,
						defaultPageSize: 5,
						total: 100,
						current: this.state.currPage,
						pageSize: this.state.pageSize,
						pageSizeOptions: ['5', '10', '15'],
						showQuickJumper: true,
						showSizeChanger: true,
						simple: '',
						size: '',
						onChange: (currPage, currPageSize) => {
							this.handleCurrPageChange(currPage, currPageSize);
						},
						onShowSizeChange: (currPage, currPageSize) => {
							this.handleCurrPageChange(currPage, currPageSize);
						}
					}}
					bordered
					scroll={{ x: true, y: 600 }}
					locale={{
						emptyText: '暂无数据，请修改查询条件'
					}}
				/>
			</div>
		)

	}
}

export default MainAdjust;