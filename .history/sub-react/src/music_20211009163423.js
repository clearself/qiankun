import React from 'react';
import { Message } from 'element-react';
import './music.css';

class Header extends React.Component{
	constructor(arg) {
	    super(arg);
		this.state = {
			name:'',
			singer:'',
		}
		this.addMusic = this.addMusic.bind(this);
	}
	
	addMusic(){
        if(this.state.name===''||this.state.singer===''){
            Message({
                message: '请输入歌名或者歌手',
                type: 'warning'
              });
              return
        }
		console.log('添加音乐',this.state)
		this.props.changeListBack(this.state.name,this.state.singer);
	}
	render(){
		return (
			<header className="header">
			  <input type="text" placeholder="歌名" value={ this.state.name } onChange={(e)=>{
				  console.log(e)
				  this.setState({
					  name:e.target.value
				  })
			  }} />
			  <input type="text" placeholder="歌手" value={ this.state.singer }onChange={(e)=>{
				  this.setState({
					  singer:e.target.value
				  })
			  }} />
			  <button onClick={this.addMusic}>添加歌曲</button>
			</header>
		)
	}
}

class Main extends React.Component{
	
	render(){
		return (
			<table className="table">
				<thead>
					<tr>
						<th>
							 <input checked={this.props.isAllSelected} type="checkbox" onChange={this.props.selectAll} />
							 全选
						</th>
						<th>
							歌曲
						</th>
						<th>
							 歌手
						</th>
						<th>
							 收藏
						</th>
						<th>
							 删除
						</th>
					</tr>
				</thead>
				<tbody>
				{
					this.props.list.map((item,index)=>{
						return (
							<tr key={index}>
								<td>
									 <input checked={item.selected} type="checkbox"  onChange={this.props.selectItem.bind(this,index)} />
								</td>
								<td>
									{item.name}
								</td>
								<td>
									{item.singer}
								</td>
								<td>
									{item.like?'收藏':'未收藏'}
								</td>
								<td>
									 <span onClick={this.props.deleteItem.bind(this,index)}>X</span>
								</td>
							</tr>
						)
					})
				}
					
				</tbody>
			</table>
		)
	}
}
class Footer extends React.Component{
	render(){
		return (
			<footer className="footer">
			  <button onClick={this.props.deleteSelected}>删除选中的歌曲</button>
			  <button onClick={this.props.collectionSelected}>收藏选中的歌曲</button>
			  <button onClick={this.props.cancelCollectionSelected}>取消收藏选中的歌曲</button>
			 </footer>
		)
	}
}
export {
	Header,
	Main,
	Footer
}