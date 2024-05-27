import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';


interface ContentResponse {
  sha: any;
  type: string;
  size: number;
  name: string;
  path: string;
  content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private octokit: Octokit;
  private owner: string = 'sai431';
  private repo: string = 'testtwo';
  private path: string = 'gym/';
  constructor(private http: HttpClient) {
    this.octokit = new Octokit({
      auth: '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' 
    });
  }
  retrieveData(username: string): Promise<any> {
    const fileName = `${username}.json`;
    
  // First, retrieve the file content from GitHub
  return this.octokit.repos.getContent({
    owner: this.owner,
    repo: this.repo,
    path: this.path + fileName
  }).then((response: any) => {
    const responseData: ContentResponse = response.data;

    if (responseData.content) {
      // Decode base64 content
      const content = atob(responseData.content);
      // Parse the JSON content
      alert(JSON.stringify(responseData))
      const jsonData = JSON.parse(content);
      // Extract username and email
      
      //const userData = { username: jsonData.username, email: jsonData.email };
      // Return the extracted data
      alert(JSON.stringify(content))
      return jsonData;
    } else {
      throw new Error('File content is empty');
    }
  });
}
async retrieveGymMachineData(username: string): Promise<any> {
  const fileName = `${username}.json`;
  
// First, retrieve the file content from GitHub
return await this.octokit.repos.getContent({
  owner: this.owner,
  repo: this.repo,
  path: 'gym/' + fileName
}).then((response: any) => {
  const responseData: ContentResponse = response.data;

  if (responseData.content) {
    // Decode base64 content
    const content = atob(responseData.content);
    // Parse the JSON content
   
    const jsonData = JSON.parse(content);
    // Extract username and email
    
    //const userData = { username: jsonData.username, email: jsonData.email };
    // Return the extracted data
    
    return jsonData;
  } else {
    throw new Error('File content is empty');
  }
});
}

async saveGymMachineData(username: string, formData: string): Promise<any> {
  const fileName = `${username}.json`;
  const content = JSON.stringify(formData);

  // Encode content to base64 using btoa
  const contentBase64 = btoa(formData);

  return await this.octokit.repos.createOrUpdateFileContents({
    owner: this.owner,
    repo: this.repo,
    path: 'gym/' + fileName,
    message: 'Save user data',
    content: contentBase64,
    committer: {
      name: 'YourName',
      email: 'youremail@example.com'
    }
    
  });
  console.log(this.owner +"Added Succesfully ")
}

async getShaFilebyNameFordelete(folderPath:string){
  await this.octokit.request('GET /repos/:owner/:repo/contents/:path', {
      owner: this.owner,
      repo: this.repo,
      path:'gym/' +folderPath
    }).then(response => {
      const sha = response.data.sha;

      return  this.octokit.request('DELETE /repos/:owner/:repo/contents/:path', {
      
        owner: this.owner,
          repo: this.repo,
        path: 'gym/'+folderPath,
        branch: 'master',
        message: 'my commit message',
       sha: response.data.sha,
      }).then((response: any) => {
        console.log('File deleted:', response);
      }).catch((error: any) => {
        console.error('Error deleting file:', error);
       });


      console.log('SHA of the file:', sha);
    }).catch(error => {
      console.error('Error getting file contents:', error);
    });
  }

  async saveGymBookingData(username: string, formData: any): Promise<any> {
    const fileName = `${username}.json`;
    const content =formData;
  
    // Encode content to base64 using btoa
    const contentBase64 = btoa(content);
  
    return this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: 'gym/' + fileName,
      message: 'Save user data',
      content: contentBase64,
      committer: {
        name: 'YourName',
        email: 'youremail@example.com'
      }
      
    });
    console.log(this.owner +"Added Succesfully ")
  }
  
  async checkFileExists(fileName: string): Promise<boolean> {
    try {
      await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: 'gym/' +fileName
      });
      return true; // File exists
    } catch (error) {
      
        return false; // File not found
       // Other errors
      
    }
  }
  async saveRegisterGymData(customerName: string, formData: any): Promise<any> {
    const fileName = `${customerName}.json`;
    const content = JSON.stringify(formData);

    // Encode content to base64 using btoa
    const contentBase64 = btoa(content);

    return this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: this.path +formData.ownerName+'/' +fileName,
      message: 'Save user data',
      content: contentBase64,
      committer: {
        name: 'YourName',
        email: 'youremail@example.com'
      }
      
    });
    console.log(this.owner +"Added Succesfully ")
  }
 
async retrievebookingDataFHAll(username: string, date :string,time :any[]): Promise<any> {
  const fileName = `${'ownerone'+date}.json`;
  
  
// First, retrieve the file content from GitHub
return this.octokit.repos.getContent({
  owner: this.owner,
  repo: this.repo,
  path: 'fHall/'+ fileName ,
}).then((response: any) => {
  const responseData: ContentResponse = response.data;

  if (responseData.content) {
    // Decode base64 content
    const content = atob(responseData.content);
    // Parse the JSON content
    alert(JSON.stringify(responseData))
    const jsonData = JSON.parse(content);
    // Extract username and email
    
    //const userData = { username: jsonData.username, email: jsonData.email };
    // Return the extracted data
    alert(JSON.stringify(content))
    return jsonData;
  } else {
    throw new Error('File content is empty');
  }
});
}


async retrievebookingDataFHAllbydateonly(username: string, date :string): Promise<any> {
  const fileName =  `${'ownerone'+date}.json`;
  
  
// First, retrieve the file content from GitHub
return this.octokit.repos.getContent({
  owner: this.owner,
  repo: this.repo,
  path: 'fHall/' + fileName ,
}).then((response: any) => {
  const responseData: ContentResponse = response.data;

  if (responseData.content) {
    // Decode base64 content
    const content = atob(responseData.content);
    // Parse the JSON content
    alert(JSON.stringify(responseData))
    const jsonData = JSON.parse(content);
    // Extract username and email
    
    //const userData = { username: jsonData.username, email: jsonData.email };
    // Return the extracted data
    alert(JSON.stringify(content))
    return jsonData;
  } else {
    throw new Error('File content is empty');
  }
});
}
//End of Gym 
  async saveBookingDataFunctionHall(username: string,  date : any ,formData: any): Promise<any> {
    const fileName = `${'ownerone'+date}.json`;
  
    const content = JSON.stringify(formData);
  
    // Encode content to base64 using btoa
    const contentBase64 = btoa(content);
  
    return this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: 'fHall/'+ fileName ,
      message: 'Save user data',
      content: contentBase64,
      committer: {
        name: 'YourName',
        email: 'youremail@example.com'
      }
    });
  }

  async checkFileExistsFhall(fileName: string): Promise<boolean> {
    try {
      await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: 'fHall/' +fileName
      });
      return true; // File exists
    } catch (error) {
      
        return false; // File not found
       // Other errors
      
    }
  }


  
async getShaFilebyNameFordeletefHall(folderPath:string){
  await this.octokit.request('GET /repos/:owner/:repo/contents/:path', {
      owner: this.owner,
      repo: this.repo,
      path:'fHall/' +folderPath
    }).then(response => {
      const sha = response.data.sha;

      return  this.octokit.request('DELETE /repos/:owner/:repo/contents/:path', {
      
        owner: this.owner,
          repo: this.repo,
        path: 'fHall/'+folderPath,
        branch: 'master',
        message: 'my commit message',
       sha: response.data.sha,
      }).then((response: any) => {
        console.log('File deleted:', response);
      }).catch((error: any) => {
        console.error('Error deleting file:', error);
       });


      console.log('SHA of the file:', sha);
    }).catch(error => {
      console.error('Error getting file contents:', error);
    });
  }

  async saveRegisterFhallData(customerName: string, formData: any): Promise<any> {
    const fileName = `${customerName}.json`;
    const content = JSON.stringify(formData);

    // Encode content to base64 using btoa
    const contentBase64 = btoa(content);

    return this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: 'fHall/'+ formData.ownerName+'/' +fileName,
      message: 'Save user data',
      content: contentBase64,
      committer: {
        name: 'YourName',
        email: 'youremail@example.com'
      }
      
    });
    console.log(this.owner +"Added Succesfully ")
  }
 
// End of  Function hall

async saveRegisterAptData(customerName: string, formData: any): Promise<any> {
  const fileName = `${customerName}.json`;
  const content = JSON.stringify(formData);

  // Encode content to base64 using btoa
  const contentBase64 = btoa(content);

  return this.octokit.repos.createOrUpdateFileContents({
    owner: this.owner,
    repo: this.repo,
    path: 'apt/'+ formData.ownerName+'/' +fileName,
    message: 'Save user data',
    content: contentBase64,
    committer: {
      name: 'YourName',
      email: 'youremail@example.com'
    }
    
  });
  console.log(this.owner +"Added Succesfully ")
}


async checkFileApartExists(fileName: string): Promise<boolean> {
  try {
    await this.octokit.repos.getContent({
      owner: this.owner,
      repo: this.repo,
      path: 'gym/' +fileName
    });
    return true; // File exists
  } catch (error) {
    
      return false; // File not found
     // Other errors
    
  }
}



async saveApartmentData(username: string, formData: string): Promise<any> {
  const fileName = `${username}.json`;
  const content = JSON.stringify(formData);

  // Encode content to base64 using btoa
  const contentBase64 = btoa(formData);

  return await this.octokit.repos.createOrUpdateFileContents({
    owner: this.owner,
    repo: this.repo,
    path: 'apt/' + fileName,
    message: 'Save user data',
    content: contentBase64,
    committer: {
      name: 'YourName',
      email: 'youremail@example.com'
    }
    
  });
  console.log(this.owner +"Added Succesfully ")
}

async retrieveApartmentData(username: string): Promise<any> {
  const fileName = `${username}.json`;
  
// First, retrieve the file content from GitHub
return await this.octokit.repos.getContent({
  owner: this.owner,
  repo: this.repo,
  path: 'apt/' + fileName
}).then((response: any) => {
  const responseData: ContentResponse = response.data;

  if (responseData.content) {
    // Decode base64 content
    const content = atob(responseData.content);
    // Parse the JSON content
   
    const jsonData = JSON.parse(content);
    // Extract username and email
    
    //const userData = { username: jsonData.username, email: jsonData.email };
    // Return the extracted data
    
    return jsonData;
  } else {
    throw new Error('File content is empty');
  }
});
}


async getShaFilebyNameFordeleteApt(folderPath:string){
  await this.octokit.request('GET /repos/:owner/:repo/contents/:path', {
      owner: this.owner,
      repo: this.repo,
      path:'apt/' +folderPath
    }).then(response => {
      const sha = response.data.sha;

      return  this.octokit.request('DELETE /repos/:owner/:repo/contents/:path', {
      
        owner: this.owner,
          repo: this.repo,
        path: 'apt/'+folderPath,
        branch: 'master',
        message: 'my commit message',
       sha: response.data.sha,
      }).then((response: any) => {
        console.log('File deleted:', response);
      }).catch((error: any) => {
        console.error('Error deleting file:', error);
       });


      console.log('SHA of the file:', sha);
    }).catch(error => {
      console.error('Error getting file contents:', error);
    });
  }

  //End of Apart
async retrieveHospData(username: string): Promise<any> {
  const fileName = `${username}.json`;
  
// First, retrieve the file content from GitHub
return await this.octokit.repos.getContent({
  owner: this.owner,
  repo: this.repo,
  path: 'hosp/' + fileName
}).then((response: any) => {
  const responseData: ContentResponse = response.data;

  if (responseData.content) {
    // Decode base64 content
    const content = atob(responseData.content);
    // Parse the JSON content
   
    const jsonData = JSON.parse(content);
    // Extract username and email
    
    //const userData = { username: jsonData.username, email: jsonData.email };
    // Return the extracted data
    
    return jsonData;
  } else {
    throw new Error('File content is empty');
  }
});

}

async getShaFilebyNameFordeletehosp(folderPath:string){
  await this.octokit.request('GET /repos/:owner/:repo/contents/:path', {
      owner: this.owner,
      repo: this.repo,
      path:'hosp/' +folderPath
    }).then(response => {
      const sha = response.data.sha;

      return  this.octokit.request('DELETE /repos/:owner/:repo/contents/:path', {
      
        owner: this.owner,
          repo: this.repo,
        path: 'hosp/'+folderPath,
        branch: 'master',
        message: 'my commit message',
       sha: response.data.sha,
      }).then((response: any) => {
        console.log('File deleted:', response);
      }).catch((error: any) => {
        console.error('Error deleting file:', error);
       });


      console.log('SHA of the file:', sha);
    }).catch(error => {
      console.error('Error getting file contents:', error);
    });
  }


  

async saveHospData(username: string, formData: string): Promise<any> {
  const fileName = `${username}.json`;
  const content = JSON.stringify(formData);

  // Encode content to base64 using btoa
  const contentBase64 = btoa(formData);

  return await this.octokit.repos.createOrUpdateFileContents({
    owner: this.owner,
    repo: this.repo,
    path: 'hosp/' + fileName,
    message: 'Save user data',
    content: contentBase64,
    committer: {
      name: 'YourName',
      email: 'youremail@example.com'
    }
    
  });
  console.log(this.owner +"Added Succesfully ")
}
//
async getTermsAndConditions(username: string): Promise<any> {
  const fileName = `${username}.json`;
  
// First, retrieve the file content from GitHub
return await this.octokit.repos.getContent({
  owner: this.owner,
  repo: this.repo,
  path: 'apt/' + fileName
}).then((response: any) => {
  const responseData: ContentResponse = response.data;

  if (responseData.content) {
    // Decode base64 content
    const content = atob(responseData.content);
    // Parse the JSON content
   
    const jsonData = JSON.parse(content);
    // Extract username and email
    
    //const userData = { username: jsonData.username, email: jsonData.email };
    // Return the extracted data
    
    return jsonData;
  } else {
    throw new Error('File content is empty');
  }
});

}

}






