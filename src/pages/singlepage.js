import React from 'react';
import '../styles/app.css';
import {Row, Col, Button, Icon, ProgressBar} from 'react-materialize'
import {config} from '../config.js'

class SinglePage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      info: {},
      isLoading: true
    };
  }

  componentDidMount(){
    this.info(this.props.match.params.id);
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  info(id) {
    fetch(config.apiUrl+id)
    .then(this.handleErrors)
    .then(res => res.json())
    .then(res => this.setState({ info: res, isLoading:false }))
    .catch(function(error) {
        console.log(error);
    });
  }

  render(){
    let prevButton = null;

    const id = parseInt(this.props.match.params.id);

    if(id > 0) {
        prevButton = <Button node="a" href={"/"+ (id-1) } waves='light'>Précédent<Icon left>chevron_left</Icon></Button>;
    } else {
        return (
            <div className="content">
                <div className="title"><h1>API Chaban</h1></div>
                <hr/>
                <Row>
                    <div className="title">Cet identifiant n'est pas valable pour l'API Chaban</div>
                </Row>
                <Row>
                    <Button node="a" href="/" waves='light'>Liste des événements<Icon left>home</Icon></Button>
                </Row>
            </div>
        )
    }

    return (
      <div className="content">
        <div className="title"><h1>API Chaban</h1></div>
        <hr/>
        {this.state.isLoading && <ProgressBar/>}
        <Row>
          <Col s={12} className='grid-example'>Date : {this.state.info.date}</Col>
        </Row>
        <Row>
          <Col s={12} className='grid-example'>Motif: {this.state.info.reason}</Col>
        </Row>
        <Row>
          <Col s={6} className='grid-example'>Début : {this.state.info.start}</Col>
          <Col s={6} className='grid-example'>Fin : {this.state.info.end}</Col>
        </Row>
        <Row className="nav">
            { prevButton }
          <Button node="a" href={"/"+(parseInt(this.props.match.params.id,10)+1)} waves='light'>Suivant<Icon right>chevron_right</Icon></Button>
        </Row>
        <Row >
          <Button node="a" href="/" waves='light'>Liste des événements<Icon left>home</Icon></Button>
        </Row>
      </div>
    );
  }
}

export default SinglePage;
