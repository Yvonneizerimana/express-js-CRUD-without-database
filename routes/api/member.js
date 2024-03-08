const express=require('express');
const members=require('../../members');
const router=express.Router();
const uuid=require('uuid');


//get all members
router.get("/",(req,res)=>{
    res.json(members);
    });
    
    //get member by id
    router.get('/:id',(req,res)=>{
    
    let changeIdToInteger=parseInt(req.params.id);
        const member=members.filter((user)=>user.id === changeIdToInteger);
    
        if(!member){
            res.status(400).json({message:`User with ${req.params.id} not found .`});
        }
        else if(isNaN(changeIdToInteger)){
            res.status(400).json({message:"Bad request j, Invalid id !"});
        }
        else{
            res.status(200).send(member); 
        }
    });

    //create member
    router.post('/',(req,res)=>{

        const newMember={
            id:uuid.v4(),
            names:req.body.names,
            email:req.body.names,
            location:req.body.location,
            status:'Single'
        }

        if(!newMember.names){
            res.json({message:"Please include names "});
        }
        else if(!newMember.email){
            res.json({message:"Please include email "});
        }
        else if(!newMember.location){
            res.json({message:"Please include location"});
        }
        else{
        members.push(newMember);
        res.status(200).send({message:"new member was added successfuly !"});
        }
 
    });

    //update member

    router.put('/:id',(req,res)=>{

        let changeString=parseInt(req.params.id);
       let update=members.findIndex((element)=>element.id===changeString);

        let updatedMember=req.body;
        if(update!==-1){
        
            members[update].names=updatedMember.names? updatedMember.names:members.names;
            members[update].email=updatedMember.email? updatedMember.email:members.email;
            members[update].location=updatedMember.location? updatedMember.location:members.location;

            res.send(members);
        }
    });

    //delete member

    router.delete('/:id',(req,res)=>{

        let changeString=parseInt(req.params.id);
       let deleteMember=members.findIndex((element)=>element.id===changeString);

        if(deleteMember!==-1){
        
            members.splice(members[deleteMember],1);

            res.send({message:`Member whose this id ${changeString} was  deleted successfuly ! `});
        }
    });

module.exports=router;