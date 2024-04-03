
export default function MyCourse ({userRole}){
  
  if (userRole == 'Teacher'){
    return(
      // This component will be filled with relevant information about the classes you teach
      <tr>
      <td><a href="">CS 108</a></td>
      <td>Ammon Hepworth</td>
      <td>MWF 2:00-2:50 PM</td>
      <td>4/10</td>
    </tr>
  )}
  else if (userRole == 'Student'){
    return(
      // This component will be filled with relevant information about the classes you're enrolled in
      <tr>
        <td>CS 106</td>
        <td>Ammon Hepworth</td>
        <td>MWF 2:00-2:50 PM</td>
        <td>4/10</td>
      </tr>
    )
  }
}