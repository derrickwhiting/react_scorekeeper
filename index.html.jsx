<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css" />
  </head>
  <body>
    <nav>
      <div class="nav-wrapper grey darken-3 center">
        <a class="brand-logo">Score Keeper</a>
      </div>
    </nav>
    <div id='teams'></div>
    <script type="text/babel">
      class Teams extends React.Component{
        constructor(props){
          super(props);
          this.state = { teams: [], complete: 0, nextID: 0};
          this.teams = this.teams.bind(this);
          this.addTeam = this.addTeam.bind(this);
          this.refreshCount = this.refreshCount.bind(this);
          this.deleteTeam = this.deleteTeam.bind(this);
        }
        refreshCount(id, checked){
          let teamArray = this.state.teams;
          let index = teamArray.findIndex( x => x.id === id);
          let team = teamArray.splice(index, 1)[0];
          team.complete = checked;
          let complete = this.state.complete;
          if (checked){
            teamArray.push(team);
            complete++;
          } else {
            teamArray.unshift(team);
            complete--;
          }
          this.setState({complete: complete, teams: teamArray});
        }
        deleteTeam(id){
          let teamArray = this.state.teams;
          let index = teamArray.findIndex( x => x.id === id);
          let checked = teamArray[index].complete;
          let complete = checked ? (this.state.complete - 1) : this.state.complete;
          teamArray.splice(index, 1);
          this.setState({ teams: teamArray, complete: complete, nextID: this.nextID(this.state.nextID) });
        }
        teams(){
          let teams = [];
          this.state.teams.map( team => {
            teams.push(<Team key={`team-${team.id}`} {...team} deleteTeam={this.deleteTeam} refreshCount={this.refreshCount} />);
          })
          return teams;
        }
        rounds(){
          let rounds
        }
        nextID(id){
          return id += 1;
        }
        addTeam(e){
          e.preventDefault();
          let teams = this.state.teams;
          teams.unshift({ name: this.refs.name.value, complete: false, id: this.state.nextID });
          this.refs.name.value = null;
          this.setState({ teams: teams, nextID: this.nextID(this.state.nextID) });
        }
        render(){
          return(
            <div>
              <div className='row'>  
                <div className='col s3 card'>
                  <div className='row'>
                    <div className='card-title col s8'> Team </div>
                    <div className='card-title col s4'> Score </div>
                    <hr />
                  </div>
                  <div className='row'>
                    {this.teams()}
                  </div>
                  <div className='row'>  
                    <div className='col s6 offset-s1'>
                      <form onSubmit={this.addTeam}>
                        <input placeholder='add team' type='text' ref='name' />
                      </form>
                    </div>
                  </div>
                </div>
                <div className='col s8 offset-s1 card'>
                  <div className='center card-title'>Test</div>
                </div>
              </div>
            </div>
          );
        }
      }

      class Team extends React.Component{
        constructor(props){
          super(props);
          this.state = { checked: false, style: {}, score: 0 };
          this.toggleChecked = this.toggleChecked.bind(this);
        }
        toggleChecked(){
          let complete = !this.state.checked;
          let style = {};
          if (complete) {
            style = {
              textDecoration: 'line-through',
              color: 'grey'
            }
          }
          this.setState({ checked: complete, style: style });
          this.props.refreshCount(this.props.id, complete);
        }
        updateScore(){
          this.setState({score: this.state.score + 1});
        }
        render(){
          let id = `complete-${this.props.id}`;
          let color = this.state.checked ? 'green lighten-5' : 'grey lighten-5';
          return(
            <div>
              <div className='col m9' style={this.state.style}>
                {this.props.name}
              </div>
              <div className='col m3'>
                {this.state.score}
              </div>
            </div>
          )
        }
      }

      class Rounds extends React.Component{
        constructor(props){
          super(props);
          this.state = { Round: 1}
        }
        render(){
          return(
            <div className="card">
              <div className='card-title center'>Rounds</div>
              <h2>Round</h2>
            </div>
          )
        }
      }

      ReactDOM.render(<Teams />, document.getElementById('teams'));
    </script>
  </body>
</html>