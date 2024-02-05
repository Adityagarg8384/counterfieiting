// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0;

contract ProductFactory{

    address[] public deployedproduct;

    event productcreated(string productname, string indexed productcompany, string imageuri, string indexed productcategory,
    address indexed owner, address productaddress);

    function createproduct(string memory productname,string memory productcompany, string memory imageuri, 
    string memory productcategory) public{
        Product newproduct= new Product(productname, imageuri, msg.sender);
        deployedproduct.push(address(newproduct));

        emit productcreated(productname, productcompany, imageuri,productcategory, msg.sender, address(newproduct));
    }
}

contract Product{
    string public ProductName;
    string public ImageUri;
    address public ProductOwner;
    string[] public hashproduct;
    constructor(string memory productname, string memory imageuri, address productOwner){
        ProductName=productname;
        ImageUri= imageuri;
        ProductOwner= productOwner;
    }

    event addproductsuccess(string indexed productname);

    function addproduct(string memory productname, string memory hash) public{
        hashproduct.push(hash);
        emit addproductsuccess(productname);
    }

    event verifyproductsuccess(string indexed productname);

    function verifyproduct(string memory productname, string memory hash) public {
        uint index;
        uint flag=0;
        for(uint i=0;i<hashproduct.length;i++){
            if(keccak256(abi.encodePacked(hashproduct[i])) == keccak256(abi.encodePacked(hash))){
                flag=1;
                index=i;
                break;
            }
        }
        require(flag==0, "Product is duplicate");
        hashproduct[index]= hashproduct[hashproduct.length-1];
        hashproduct.pop();
        emit verifyproductsuccess(productname);
    }

}
