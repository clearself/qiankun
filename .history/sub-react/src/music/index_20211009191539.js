import './index.css';
import React from 'react';
import { Dialog,Button,Message} from 'element-react';
import { Header,Main,Footer} from './music';

class App extends React.Component{
	constructor(arg) {
	    super(arg);
		this.state = {
            dialogVisible: false,
			isAllSelected:false,
            deleteIndex:0,
			list:[
				{
					name:'忘情水1',
					singer:'刘德华1',
					selected:false,
					like:false,
				},{
					name:'忘情水2',
					singer:'刘德华2',
					selected:false,
					like:false,
				},{
					name:'忘情水3',
					singer:'刘德华',
					selected:false,
					like:false,
				},{
					name:'忘情水4',
					singer:'刘德华',
					selected:false,
					like:false,
				},{
					name:'忘情水5',
					singer:'刘德华',
					selected:false,
					like:false,
				},
				
			]
		}
		this.changeList = this.changeList.bind(this)
		this.selectAll = this.selectAll.bind(this)
		this.selectItem = this.selectItem.bind(this)
		this.deleteItem = this.deleteItem.bind(this)
		this.deleteSelected = this.deleteSelected.bind(this)
		this.collectionSelected = this.collectionSelected.bind(this)
		this.cancelCollectionSelected = this.cancelCollectionSelected.bind(this)
		this.deleteSure = this.deleteSure.bind(this)
        this.toCollectList = this.toCollectList.bind(this)
        
	}
    toCollectList(){
        this.routerNav('/collect')
        
    }
    routerNav(path){
        if(window.__POWERED_BY_QIANKUN__){
            history.pushState(null, `/#/micrApp/sub-react${path}`, `/#/micrApp/sub-react${path}`)
        }else{
            this.props.history.push(path)
        }
    }
    deleteSure(){
        let list = this.state.list;
		list.splice(this.state.deleteIndex,1);
		this.setState({
			isAllSelected:list.some(item=>item.selected===false)?false:true,
			list,
            dialogVisible:false
		})
    }
	cancelCollectionSelected(){
        if(this.state.list.some((item,index)=>item.selected===true)){
            let list = this.state.list.map((item,index)=>{
				if(item.like && item.selected){
					item.like = false;
				}
				return item;
			})
			this.setState({
				isAllSelected:list.some(item=>item.selected===false)?false:true,
				list
			})
            
        }else{
            Message({
                message: '请选择取消收藏的歌曲',
                type: 'warning'
              });
              return
        }
		
	}
	collectionSelected(){
        if(!this.state.list.some((item,index)=>item.selected===true)){
            Message({
                message: '请选择收藏的歌曲',
                type: 'warning'
              });
              return
        }
		let list = this.state.list.map((item,index)=>{
				if(item.selected){
					item.like = true;
				}
				return item;
			})
			this.setState({
				isAllSelected:list.some(item=>item.selected===false)?false:true,
				list
			})
	}
	deleteSelected(){
        if(!this.state.list.some((item,index)=>item.selected===true)){
            Message({
                message: '请选择删除的歌曲',
                type: 'warning'
              });
              return
        }
		let list = this.state.list.filter((item,index)=>item.selected===false);
			this.setState({
				isAllSelected:list.some(item=>item.selected===false)?false:true,
				list
			})
	}
	deleteItem(index,e){
        this.setState({
			dialogVisible:true,
            deleteIndex:index
		})
		
	}
	selectItem(index,e){
		console.log(e)
		let list = [];
		if(e.target.checked){
			list = this.state.list.map((item,_index)=>{
				if(index === _index){
					item.selected = true;
				}
				return item;
			})
		}else{
			list = this.state.list.map((item,_index)=>{
				if(index === _index){
					item.selected = false;
				}
				return item;
			})
		}
		this.setState({
			isAllSelected:list.some(item=>item.selected===false)?false:true,
			list
		})
	}
	selectAll(e){
		let list = [];
		if(e.target.checked){
			list = this.state.list.map(item=>{
				item.selected = true;
				return item;
			})
			
		}else{
			list = this.state.list.map(item=>{
				item.selected = false;
				return item;
			})
		}
		this.setState({
			isAllSelected:e.target.checked?true:false,
			list
		})
	}
	changeList(name,singer){
		let list = this.state.list;
		list.push({
			name:name,
			singer:singer,
			selected:false,
			like:false,
		})
		this.setState({
			list
		})
	}
  render(){
	  return (
	  	<div className="App">
				{ 
					<Header
					changeListBack={this.changeList}
					/> 
				}
				{ 
					<Main 
					list={this.state.list}
					isAllSelected={this.state.isAllSelected}
					selectAll={this.selectAll}
					deleteItem={this.deleteItem}
					selectItem={this.selectItem}
					/> 
				}
				{ 
					<Footer 
					deleteSelected={this.deleteSelected}
					collectionSelected={this.collectionSelected}
					cancelCollectionSelected={this.cancelCollectionSelected}
                    toCollectList={this.toCollectList}
					/> 
				}
                {
                    <Dialog
                        title="提示"
                        size="tiny"
                        visible={ this.state.dialogVisible }
                        onCancel={ () => this.setState({ dialogVisible: false }) }
                        lockScroll={ false }
                    >
                        <Dialog.Body>
                        <span>确定删除吗？</span>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                        <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                        <Button type="primary" onClick={ this.deleteSure }>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                }
	  	</div>
	  )
  }
}
export default App;