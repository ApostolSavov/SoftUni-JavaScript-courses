import { html } from '../../node_modules/lit-html/lit-html.js';

//navbar
export const navbarTemplate = (token, path, logout) => {
	return html` <nav>
		<a class=${path == '/' ? 'active' : ''} href="/">Home</a>
		<a class=${path == '/catalog' ? 'active' : ''} href="/catalog">All Listings</a>
		<a class=${path == '/search' ? 'active' : ''} href="/search">By Year</a>
		${!token
			? html`<div id="guest">
					<a class=${path == '/login' ? 'active' : ''} href="/login">Login</a>
					<a class=${path == '/register' ? 'active' : ''} href="/register">Register</a>
			  </div>`
			: html`<div id="profile">
					<a>Welcome ${sessionStorage.getItem('username')}</a>
					<a class=${path == '/profile' ? 'active' : ''} href="/profile">My Listings</a>
					<a class=${path == '/create' ? 'active' : ''} href="/create">Create Listing</a>
					<a @click=${logout} href="javascript:void(0)">Logout</a>
			  </div>`}
	</nav>`;
};

//welcome page
export const welcomeTemplate = () => {
	return html`
		<section id="main">
			<div id="welcome-container">
				<h1>Welcome To Car Tube</h1>
				<img class="hero" src="/images/car-png.webp" alt="carIntro" />
				<h2>To see all the listings click the link below:</h2>
				<div>
					<a href="/catalog" class="button">Listings</a>
				</div>
			</div>
		</section>
	`;
};

//catalog Page
export const catalogTemplate = (data, pages, page) => {
	return html`
		<section id="car-listings">
			<h1>Car Listings</h1>
			<br />
			<div class="listings">
				<div>
					${!(page <= 1) ? html`<a class="button-list" href="/catalog?page=${page - 1}">prev &lt;</a>` : ''}
					<span>page ${page}/${pages}</span>
					${!(page >= pages) ? html`<a class="button-list" href="/catalog?page=${page + 1}">&gt; next</a>` : ''}
				</div>
				${data.length > 0
					? data.map((entry) => {
							return html`
								<div class="listing">
									<div class="preview">
										<img src=${entry.imageUrl} />
									</div>
									<h2>${entry.brand} ${entry.model}</h2>
									<div class="info">
										<div class="data-info">
											<h3>Year: ${entry.year}</h3>
											<h3>Price: ${entry.price} $</h3>
										</div>
										<div class="data-buttons">
											<a href="/details/${entry._id}" class="button-carDetails">Details</a>
										</div>
									</div>
								</div>
							`;
					  })
					: html` <p class="no-cars">No cars in database.</p> `}
			</div>
		</section>
	`;
};

//login page
export const loginTemplate = (loginHandler) => {
	return html`
		<section id="login">
			<div class="container">
				<form @submit=${loginHandler} id="login-form" action="#" method="post">
					<h1>Login</h1>
					<p>Please enter your credentials.</p>
					<hr />
					<p>Username</p>
					<input placeholder="Enter Username" name="username" type="text" />
					<p>Password</p>
					<input type="password" placeholder="Enter Password" name="password" />
					<input type="submit" class="registerbtn" value="Login" />
				</form>
				<div class="signin">
					<p>Dont have an account? <a href="/register">Sign up</a>.</p>
				</div>
			</div>
		</section>
	`;
};

//register page
export const registerTemplate = (registerHandler) => {
	return html`
		<section id="register">
			<div class="container">
				<form @submit=${registerHandler} id="register-form">
					<h1>Register</h1>
					<p>Please fill in this form to create an account.</p>
					<hr />
					<p>Username</p>
					<input type="text" placeholder="Enter Username" name="username" required />
					<p>Password</p>
					<input type="password" placeholder="Enter Password" name="password" required />
					<p>Repeat Password</p>
					<input type="password" placeholder="Repeat Password" name="repeatPass" required />
					<hr />
					<input type="submit" class="registerbtn" value="Register" />
				</form>
				<div class="signin">
					<p>Already have an account? <a href="/login">Sign in</a>.</p>
				</div>
			</div>
		</section>
	`;
};

//create page
export const createTemplate = (createHandler) => {
	return html`
		<section id="create-listing">
			<div class="container">
				<form @submit=${createHandler} id="create-form">
					<h1>Create Car Listing</h1>
					<p>Please fill in this form to create an listing.</p>
					<hr />
					<p>Car Brand</p>
					<input type="text" placeholder="Enter Car Brand" name="brand" />
					<p>Car Model</p>
					<input type="text" placeholder="Enter Car Model" name="model" />
					<p>Description</p>
					<input type="text" placeholder="Enter Description" name="description" />
					<p>Car Year</p>
					<input type="number" placeholder="Enter Car Year" name="year" />
					<p>Car Image</p>
					<input type="text" placeholder="Enter Car Image" name="imageUrl" />
					<p>Car Price</p>
					<input type="number" placeholder="Enter Car Price" name="price" />
					<hr />
					<input type="submit" class="registerbtn" value="Create Listing" />
				</form>
			</div>
		</section>
	`;
};

//edit page
export const editTemplate = (data, editHandler) => {
	return html`
		<section id="edit-listing">
			<div class="container">
				<form @submit=${editHandler} id="edit-form">
					<h1>Edit Car Listing</h1>
					<p>Please fill in this form to edit an listing.</p>
					<hr />
					<p>Car Brand</p>
					<input type="text" placeholder="Enter Car Brand" name="brand" .value=${data.brand} />
					<p>Car Model</p>
					<input type="text" placeholder="Enter Car Model" name="model" .value=${data.model} />
					<p>Description</p>
					<input type="text" placeholder="Enter Description" name="description" .value=${data.description} />
					<p>Car Year</p>
					<input type="number" placeholder="Enter Car Year" name="year" .value=${data.year} />
					<p>Car Image</p>
					<input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${data.imageUrl} />
					<p>Car Price</p>
					<input type="number" placeholder="Enter Car Price" name="price" .value=${data.price} />
					<hr />
					<input type="submit" class="registerbtn" value="Edit Listing" />
				</form>
			</div>
		</section>
	`;
};

//details page
export const detailsTemplate = (data, token, del) => {
	return html`
		<section id="listing-details">
			<h1>Details</h1>
			<div class="details-info">
				<img src=${data.imageUrl} />
				<hr />
				<ul class="listing-props">
					<li><span>Brand:</span>${data.brand}</li>
					<li><span>Model:</span>${data.model}</li>
					<li><span>Year:</span>${data.year}</li>
					<li><span>Price:</span>${data.price}$</li>
				</ul>
				<p class="description-para">${data.description}</p>
				<div class="listings-buttons">
					${token == data._ownerId ? html`<a href="/edit/${data._id}" class="button-list">Edit</a>` : ''}
					${token == data._ownerId ? html`<a @click=${del} href="javascript:void(0)" class="button-list">Delete</a>` : ''}
				</div>
			</div>
		</section>
	`;
};

//profile page
export const profileTemplate = (data) => {
	return html`
		<section id="my-listings">
			<h1>My car listings</h1>
			<div class="listings">
				${data.length > 0
					? data.map((entry) => {
							return html`
								<div class="listing">
									<div class="preview">
										<img src=${entry.imageUrl} />
									</div>
									<h2>${entry.brand} ${entry.model}</h2>
									<div class="info">
										<div class="data-info">
											<h3>Year: ${entry.year}</h3>
											<h3>Price: ${entry.price} $</h3>
										</div>
										<div class="data-buttons">
											<a href="/details/${entry._id}" class="button-carDetails">Details</a>
										</div>
									</div>
								</div>
							`;
					  })
					: html`<p class="no-cars">You haven't listed any cars yet.</p>`}
			</div>
		</section>
	`;
};

//search page
export const searchTemplate = (data, searchHandler) => {
	return html`
		<section id="search-cars">
			<h1>Filter by year</h1>
			<div class="container">
				<input id="search-input" type="text" name="search" placeholder="Enter desired production year" />
				<button @click=${searchHandler} class="button-list">Search</button>
			</div>
			<h2>Results:</h2>
			<div class="listings">
				${data.length > 0
					? data.map((entry) => {
							return html`
								<div class="listing">
									<div class="preview">
										<img src=${entry.imageUrl} />
									</div>
									<h2>${entry.brand} ${entry.model}</h2>
									<div class="info">
										<div class="data-info">
											<h3>Year: ${entry.year}</h3>
											<h3>Price: ${entry.price} $</h3>
										</div>
										<div class="data-buttons">
											<a href="/details/${entry._id}" class="button-carDetails">Details</a>
										</div>
									</div>
								</div>
							`;
					  })
					: html` <p class="no-cars">No results.</p>`}
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
