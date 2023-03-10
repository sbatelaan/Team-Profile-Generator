const fs = require('fs')
const inquirer = require('inquirer')
const Manager = require('./library/Manager')
const Engineer = require('./library/Engineer')
const Intern = require('./library/Intern')
const path = require('path')
const team = ['']
const genHTML = require('./src/generateHTML')

const addManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the managers name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your id number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?',
        },
        {
            type: 'confirm',
            name: 'newEmployee',
            message: 'Would you like to add another employee?'
        }
    ])
    .then((data) => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        team.push(manager)
        if (data.newEmployee) {
            addEmployee()
        } else {
            console.log(team)
            addTeam()
        }
    })

}
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'typeOfEmployee',
            message: 'Choose employee role',
            choices: ['engineer', 'intern', 'I\'m done']
        },
    ])
    .then((data) => {
        if (data.typeOfEmployee === 'engineer') {
            addEngineer()
        }
        if (data.typeOfEmployee === 'intern') {
            addIntern()
        } if (data.typeOfEmployee === 'I\'m done') {
            addTeam()
        }
    })
}

const addEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the engineers name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the engineers id number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the engineers email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github?',
        },
        {
            type: 'confirm',
            name: 'newEmployee',
            message: 'Would you like to add another employee?'
        }
    ])
    .then((data) => {
        const newEngineer = new Engineer(data.name, data.id, data.email, data.github)
        team.push(newEngineer)
        if (data.newEmployee) {
            addEmployee()
        } else {
            addTeam()
        }
    })
}

const addIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the interns name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the interns id number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the interns email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the interns school name?',
        },
        {
            type: 'confirm',
            name: 'newEmployee',
            message: 'Would you like to add another employee?'
        }
    ])
    .then((data) => {
        const newIntern = new Intern(data.name, data.id, data.email, data.github)
        team.push(newIntern)
        if (data.newEmployee) {
            addEmployee()
        } else {
            addTeam()
        }
    })
}

function addTeam() {
	const htmlPageContent = [];
	const htmlPageHead = `
	<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
			crossorigin="anonymous"
		/>
		<link rel="stylesheet" href="./style.css" />
		<title>Team Profile Generator</title>
	</head>
	<body>
		<div class="container">
			<div class="jumbotron text-center">
				<div class="container">
					<h1 class="display-2">Team</h1>
				</div>
			</div>
		</div>
    
		<div class="container">
			<div class="row p-4 justify-content-center">
				<div class="row p-3 d-flex justify-content-between">`

	htmlPageContent.push(htmlPageHead);

	for (let i = 0; i < team.length; i++) {
		let card = `
					<div class="card" style="width: 19rem">
						<div class="card-body">
							<h3 class="card-title">${team[i].name}</h3>
							<h5 class="card-subtitle">${team[i].role}</h5>
							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									<strong>ID:</strong> ${team[i].id}
								</li>
								<li class="list-group-item">
									<strong>Email:</strong>
								<a href="mailto:${team[i].email}"
									>${team[i].email}</a
									>
								</li>`;
			if (team[i].officeNumber) {
				card += `
								<li class="list-group-item">
									<strong>Office Number: </strong>${team[i].officeNumber}
								</li>`;
			}if (team[i].gitHub) {
				card += `
								<li class="list-group-item">
									<strong>GitHub:</strong> <a href="https://github.com/${team[i].gitHub}">${team[i].gitHub}</a>
								</li>`;
			}if (team[i].school) {
			card += `
								<li class="list-group-item">
									<strong>School:</strong> ${team[i].school}
								</li>`;
			}
			card += `
							</ul>			
						</div>
					</div>`;

		htmlPageContent.push(card);
	}

	
	const htmlFoot = `
				</div >
			</div >
  		</div >
	  
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/	bootstrap.bundle.min.js"
        integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
        crossorigin="anonymous"></script>
    </body>
    
</html>`;
	htmlPageContent.push(htmlFoot);

	fs.writeFile('dist/index.html', htmlPageContent.join(''), (err) =>
		err ? console.log(err) : console.log('Successfully created index.html!')
	);
}


addManager()