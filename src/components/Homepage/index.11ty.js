import Base from './Base';
import Button from './Button';

const createPage = greeting => `
  <div>
    <p>${greeting}</p>
    ${Button({ url: '#', text: 'Click me!'})}
  </div>
`

module.exports = ({ greeting }) => Base(createPage(greeting))
