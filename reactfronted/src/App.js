import React from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api'
import PostView from './Components/PostView';

// Fronted Material UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// 함수형 component => props(변경 불가)

// 클래스형 component => state(변경 가능한 값)

// lifecycle => 클래스 component 쓰이는 개념

// component 생성 => 생성자 호출 -> render() 호출
class App extends React.Component{
  // 생성자를 추가합니다.
  // 1.
  constructor(props){
    super(props)
    this.state={
      title:"",
      content:"",
      results:[],
    }
  }
  // lifecycle : 컴포넌트 호출 -> 생성자 만들어지고 -> render()
  // -> componentDidMount() -> state이 변경되면 render가 다시 됨 => componentDidMount()
  componentDidMount(){
    this.getPost()
  }
  async getPost(){
    const _results=await api.getAllPost()
    this.setState({results:_results.data})
  }
  handlingChange=(event)=>{
    this.setState(
      { [event.target.name]:event.target.value }
    )
      console.log(event.target)
  }
  handlingSubmit=async(event)=>{
    // onSubmit의 디폴트 액션은 새로고침이다.
    event.preventDefault()
    let result=await api.createPost({title: this.state.title, content: this.state.content})
    console.log("완료됨", result)
    this.setState({title:'', content:''})
    this.getPost()
  }
  handlingDelete=async(event)=>{
    await api.deletePost(event.target.value)
    this.getPost()
  }
  render(){
    return(
      <Container maxWidth="lg">
        <div className="App">
          <div className="PostingSection">
            <Paper className="PostingPaper">
              <h2>대나무 숲 글 작성하기</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>

              <TextField 
                id="outlined-basic"
                label="Title"
                margin="normal"
                variant="outlined"
                name="title"
                value={this.state.title}
                onChange={this.handlingChange}
              />

          <TextField
          id="outlined-multiline-static"
          label="Contents"
          multiline
          rows="4"
          margin="normal"
          variant="outlined"
          name="content"
          value={this.state.content}
          onChange={this.handlingChange}
        />

      <Button type="submit" className="PostingButton" variant="contained" color="primary">
        제출하기
      </Button>
              </form>
            </Paper>
          </div>
          <div className="ViewSection">
            {this.state.results.map((post=>
              <Card clasName="card">
                <CardContent>
        
                  <Typography variant="h5" component="h2">
                  <PostView id={post.id} title={post.title} content={post.content} />  
                  </Typography>

                  <button value={post.id} onClick={this.handlingDelete} size="small">삭제하기</button>
                </CardContent>

              </Card>        
            ))}
          </div>
        </div>
      </Container>
    )
  }
}

export default App;
