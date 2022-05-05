import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {  // 초기화하고 싶은 것은 생성자 안에 코드를 작성한다.
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:1,
      subject:{title:'WEB', sub:"world wide web!"},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText Markup Language.'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent() {
    let i = 0;
    while(i < this.state.contents.length){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i + 1;
  }
}

  getContent() {
    let _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read') {
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id += 1;
        let _contents = Array.from(this.state.contents);  // 복제본 생성
        _contents.push({id:this.max_content_id, title:_title, desc:_desc}); // 복제본에 push
          this.setState({       // 복제본 넘겨줌
            contents:_contents,
            mode:'read',
            selected_content_id:this.max_content_id
          });
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {
          let _contents = Array.from(this.state.contents);  // 원본을 변경하지 않기 위해 복제본 생성
          let i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i += 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }

    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage = {function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
          >
        </Subject>
        <TOC
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}  // App.js에서 this.state에 contents라는 props의 초기값을 할당하였고 TOC 태그 요소에 data={this.state.contents}를 넣어줌
                                      // -> TOC.js는 data 요소를 가져다가 사용할 수 있는 것
        ></TOC>  
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              let _contents = Array.from(this.state.contents);
              let i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                }
                i += 1
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          }
          else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>      
        {this.getContent()}
      </div>
    );
  }
}

export default App;