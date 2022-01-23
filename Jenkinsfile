pipeline {
  agent any
  environment {
        PATH = "$PATH:/Documents/apache-maven-3.8.4/apache-maven/src/bin"
    }
  tools {nodejs "nodejs"}
  
   stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    
     stage('Sonar scan'){
       steps{
          sh 'mvn clean package'
         withSonarQubeEnv(installationName:'creationGroupe'){
           sh "mvn sonar:sonar"
         }
       }
     }
     
    stage('Unit tests') {
        steps { sh 'npm run-script test' }
    }
    stage('Build') {
      steps {
        sh 'npm run-script build' }
    }
    
  }
}
