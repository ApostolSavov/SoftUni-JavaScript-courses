import { html } from '../../node_modules/lit-html/lit-html.js';

//navbar
export const navbarTemplate = (token, path, logout) => {
	return html` <nav>
		${token
			? html`<div class="user">
					<a class=${path == '/catalog' ? 'active' : ''} href="/catalog">All Memes</a>
					<a class=${path == '/create' ? 'active' : ''} href="/create">Create Meme</a>
					<div class="profile">
						<span>Welcome, ${sessionStorage.getItem('email')}</span>
						<a class=${path == '/profile' ? 'active' : ''} href="/profile">My Profile</a>
						<a @click=${logout} href="javascript:void(0)">Logout</a>
					</div>
			  </div>`
			: html`<div class="guest">
					<div class="profile">
						<a href="/login">Login</a>
						<a href="/register">Register</a>
					</div>
					<a class=${path == '/' ? 'active' : ''} href="/">Home Page</a>
					<a class=${path == '/catalog' ? 'active' : ''} href="/catalog">All Memes</a>
			  </div>`}
	</nav>`;
};

//welcome page
export const welcomeTemplate = () => {
	return html`
		<section id="welcome">
			<div id="welcome-container">
				<h1>Welcome To Meme Lounge</h1>
				<img src="/images/welcome-meme.jpg" alt="meme" />
				<h2>Login to see our memes right away!</h2>
				<div id="button-div">
					<a href="/login" class="button">Login</a>
					<a href="/register" class="button">Register</a>
				</div>
			</div>
		</section>
	`;
};

//catalog Page
export const catalogTemplate = (data) => {
	return html`
		<section id="meme-feed">
			<h1>All Memes</h1>
			<div id="memes">
				${data.length > 0
					? data.map((entry) => {
							return html` <div class="meme">
								<div class="card">
									<div class="info">
										<p class="meme-title">${entry.title}</p>
										<img class="meme-image" alt="meme-img" src=${entry.imageUrl} />
									</div>
									<div id="data-buttons">
										<a class="button" href="/details/${entry._id}">Details</a>
									</div>
								</div>
							</div>`;
					  })
					: html`<p class="no-memes">No memes in database.</p>`}
			</div>
		</section>
	`;
};

//login page
export const loginTemplate = (loginHandler) => {
	return html`
		<section id="login">
			<form @submit=${loginHandler} id="login-form">
				<div class="container">
					<h1>Login</h1>
					<label for="email">Email</label>
					<input id="email" placeholder="Enter Email" name="email" type="text" />
					<label for="password">Password</label>
					<input id="password" type="password" placeholder="Enter Password" name="password" />
					<input type="submit" class="registerbtn button" value="Login" />
					<div class="container signin">
						<p>Dont have an account?<a href="/register">Sign up</a>.</p>
					</div>
				</div>
			</form>
		</section>
	`;
};

//register page
export const registerTemplate = (registerHandler) => {
	return html`
		<section id="register">
			<form @submit=${registerHandler} id="register-form">
				<div class="container">
					<h1>Register</h1>
					<label for="username">Username</label>
					<input id="username" type="text" placeholder="Enter Username" name="username" />
					<label for="email">Email</label>
					<input id="email" type="text" placeholder="Enter Email" name="email" />
					<label for="password">Password</label>
					<input id="password" type="password" placeholder="Enter Password" name="password" />
					<label for="repeatPass">Repeat Password</label>
					<input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass" />
					<div class="gender">
						<input type="radio" name="gender" id="female" value="female" />
						<label for="female">Female</label>
						<input type="radio" name="gender" id="male" value="male" />
						<label for="male">Male</label>
					</div>
					<input type="submit" class="registerbtn button" value="Register" />
					<div class="container signin">
						<p>Already have an account?<a href="/login">Sign in</a>.</p>
					</div>
				</div>
			</form>
		</section>
	`;
};

//create page
export const createTemplate = (createHandler) => {
	return html`
		<section id="create-meme">
			<form @submit=${createHandler} id="create-form">
				<div class="container">
					<h1>Create Meme</h1>
					<label for="title">Title</label>
					<input id="title" type="text" placeholder="Enter Title" name="title" />
					<label for="description">Description</label>
					<textarea id="description" placeholder="Enter Description" name="description"></textarea>
					<label for="imageUrl">Meme Image</label>
					<input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl" />
					<input type="submit" class="registerbtn button" value="Create Meme" />
				</div>
			</form>
		</section>
	`;
};

//edit page
export const editTemplate = (data, editHandler) => {
	return html`
		<section id="edit-meme">
			<form @submit=${editHandler} id="edit-form">
				<h1>Edit Meme</h1>
				<div class="container">
					<label for="title">Title</label>
					<input id="title" type="text" placeholder="Enter Title" name="title" .value=${data.title} />
					<label for="description">Description</label>
					<textarea
						id="description"
						placeholder="Enter Description"
						name="description"
						.value=${data.description}
					>
					</textarea>
					<label for="imageUrl">Image Url</label>
					<input
						id="imageUrl"
						type="text"
						placeholder="Enter Meme ImageUrl"
						name="imageUrl"
						.value=${data.imageUrl}
					/>
					<input type="submit" class="registerbtn button" value="Edit Meme" />
				</div>
			</form>
		</section>
	`;
};

//details page
export const detailsTemplate = (data, token, del) => {
	return html`
		<section id="meme-details">
			<h1>Meme Title: ${data.title}</h1>
			<div class="meme-details">
				<div class="meme-img">
					<img alt="meme-alt" src=${data.imageUrl} />
				</div>
				<div class="meme-description">
					<h2>Meme Description</h2>
					<p>${data.description}</p>

					<!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
					${token == data._ownerId ? html`<a class="button warning" href="/edit/${data._id}">Edit</a>` : ''}
					${token == data._ownerId ? html`<button @click=${del} class="button danger">Delete</button>` : ''}
				</div>
			</div>
		</section>
	`;
};

//profile page
export const profileTemplate = (data, username, email, gender) => {
	return html`
		<section id="user-profile-page" class="user-profile">
			<article class="user-info">
				<img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png" />
				<div class="user-content">
					<p>Username: ${username}</p>
					<p>Email: ${email}</p>
					<p>My memes count: ${data.length}</p>
				</div>
			</article>
			<h1 id="user-listings-title">User Memes</h1>
			<div class="user-meme-listings">
				<!-- Display : All created memes by this user (If any) -->
				${data.length > 0
					? data.map((entry) => {
							return html`<div class="user-meme">
								<p class="user-meme-title">${entry.title}</p>
								<img class="userProfileImage" alt="meme-img" src=${entry.imageUrl} />
								<a class="button" href="/details/${entry._id}">Details</a>
							</div> `;
					  })
					: html`<p class="no-memes">No memes in database.</p>`}
			</div>
		</section>
	`;
};

//loading
export const loadingTemplate = () => {
	return html`
		<div class="col-md-12">
			<h2>Loading...</h2>
		</div>
	`;
};
