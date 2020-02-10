import React from 'react';
import Modal from 'react-responsive-modal';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			open: false,
			error: 'No errors'
		}
	}
	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};
	 
	onCloseModal = () => {
		this.setState({ open: false });
	};

	onSubmitRegister = () => {
		const name = this.state.name;
		const email = this.state.email;
		const password = this.state.password;
		if(!name || !email || !password){
			this.setState({error: "Error! One or more fields is empty!"});
			this.onOpenModal();
		}
		else if(!this.validateEmail(email)){
			this.setState({error: "Error! Invalid email address!"});
			this.onOpenModal();
		} else {
			fetch('https://radiant-castle-80801.herokuapp.com/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					name: this.state.name
				})
			})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				} else {
					this.setState({error: user});
					this.onOpenModal();
				}
			});
		}
		
	}

	displayError(){
		return {__html: this.state.error};
	}

	render() {
		return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        	onChange={this.onNameChange}
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			        	type="text" 
			        	name="name"  
			        	id="name" 
			        />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	onChange={this.onEmailChange}
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address" 
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	onChange={this.onPasswordChange}
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password" 
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input
			      	onClick={this.onSubmitRegister}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Register" />
			    </div>
			  </div>
			</main>
			<div>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
				<h2 dangerouslySetInnerHTML={this.displayError()}></h2>
				</Modal>
			</div>
		</article>
		);
	}
}

export default Register;