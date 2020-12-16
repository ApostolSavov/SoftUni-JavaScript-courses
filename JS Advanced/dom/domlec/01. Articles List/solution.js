function createArticle() {
	const createTitleInput = document.getElementById('createTitle')
	const createContentTextArea = document.getElementById('createContent')
	const articleSection = document.getElementById('articles')

	const newArticle = document.createElement('article')
	const articleHeading = document.createElement('h3')
	const articleParagraph = document.createElement('p')

	newArticle.appendChild(articleHeading)
	newArticle.appendChild(articleParagraph)

	articleHeading.innerHTML = createTitleInput.value
	articleParagraph.innerHTML = createContentTextArea.value

	if (createTitleInput.value && createContentTextArea.value) {
		newArticle.appendChild(articleHeading)
		newArticle.appendChild(articleParagraph)
		articleSection.appendChild(newArticle)

	}

	createTitleInput.value = ''
	createContentTextArea.value = ''
}