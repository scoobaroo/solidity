
pragma solidity ^0.4.17;

contract Lottery {
    
    address public manager;
    address public winner;
    address[] public players; 
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }
    
    function random() public view returns (uint){
        return uint(sha3(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        winner = players[index];
        players = new address[](0);
    }
    
    function getPlayers() public view returns(address[]){
        return players;
    }
    
    modifier restricted() {
        require(msg.sender==manager);
        _;
    }
}