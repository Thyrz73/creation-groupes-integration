pipeline {
  agent any
  tools {nodejs "nodejs"}
  
   stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    
     stage('Sonar scan'){
       steps{
         withSonarQubeEnv(installationName:'creationGroupe'){
           sh './mynw clean org.sonarsource.scanner.maven: sonar-maven-plugin: 3.9.0.2155: sonar'
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
