import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,
     Label,Row, Col} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component{

    constructor(props){
        super(props);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        isModalOpen: false
    };
    }
  
      toggleModal() {
          this.setState({
            isModalOpen: !this.state.isModalOpen
          });
        }
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

            // event.preventDefault();
        }
    render(){
        return(
           <div>
              <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa=lg"></span> Submit Comment</Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                    <Col md={12}>
                    <Label htmlfor="rating" >Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        rows="12"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Col>
                        </Row>
                    <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comments</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="5"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
           </div>
        );
    }
  }
  function RenderComments({comment, postComment, dishId}) {
    
        if(comment!=null)
        {
        const cmts=comment.map((comment)=>{
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                   </li>
                
        )});
        return (
            <div>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmts}  
                    </ul>  
                    <CommentForm dishId={dishId} postComment={postComment} />  
            </div>
        )
        } else{
             return (<div></div>)
        };
    }
function   RenderDish({dish}) {
       
            return(
              <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                
                
                
            </div>
            );
    }

    const DishDetail= (props)=>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comment={props.comments} postComment={props.postComment}
        dishId={props.dish.id}/>
                </div>
            </div>
        );
        }
}
export default DishDetail;