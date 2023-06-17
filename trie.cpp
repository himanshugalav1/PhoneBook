#include <iostream>
using namespace std;
#include <string>
#include <vector>
#include <map>

map<string, string> dictname;
map<string, string> dictnum;

struct NameNode{
    NameNode *links[26];
    bool flag = false;
};

class NameTrie {
private: NameNode *root;
public:
    NameTrie(){
        root = new NameNode(); 
    }
    
    int insert(string name) {
        NameNode *node = root;
        for(int i=0; i<name.size(); i++){
            if( node->links[ name[i] - 'a'] == NULL ){
                node->links[ name[i] - 'a'] = new NameNode();
            }
            node = node->links[ name[i] - 'a'];
        }
        if(node->flag==true){
            // cout<<"Already present"<<endl;
            return -1;
        }
        node->flag = true;
        return 1;
    }

    bool search(string name) {
        NameNode *node = root;
        for(int i=0; i<name.size(); i++){
            cout<< name[i]<<" "<<node->links[ name[i] - 'a' ]<<endl;
            if( node->links[ name[i] - 'a' ] == NULL ) return false;
            node = node->links[ name[i] - 'a'];
        }
        if( node->flag == true ) return true;
        return false;
    }

    bool startsWith(string prefix) {
        NameNode *node = root;
        for(int i=0; i<prefix.size(); i++){
            cout<< prefix[i]<<" "<<node->links[ prefix[i] - 'a' ]<<endl;
            if( node->links[ prefix[i] - 'a'] == NULL ) return false;
            node = node->links[ prefix[i] - 'a'];
        }
        return true;
    }

    bool isLastNode(NameNode* node){
        for(int i=0; i<26; i++){
            if(node->links[i]!=NULL) return false;
        }
        return true;
    }

    void rec(NameNode* node, string name, vector<string>& store){
        if(node->flag == true){
            // cout<<"found flag as true "<<name<<endl;
            store.push_back(name);
        }
        for(int i=0; i<26; i++){
            // cout<<"looping for"<<i<<" "<<name<<endl;
            if(node->links[i]!=NULL){
                // cout<<"found "<<i<<" "<<name<<endl;
                name += (char)(i + 'a');
                rec(node->links[i], name, store);
                // cout<<"going back to "<<i<<" "<<name<<endl;
                name.erase(name.end()-1);
            }
        }
        return;
    }
    void print(){
        NameNode* node = root;
        vector<string> store;
        // cout<<"Start Printing "<<endl;
        rec(node, "", store);
        // To print name only
        // for(int i=0; i<store.size(); i++) cout<<store[i]<<endl;
        // To print name along with contact
        for(int i=0; i<store.size(); i++) cout<<store[i]<<" - "<<dictname[store[i]]<<endl;
    }
    int printpref(string pref){
        NameNode* node = root;
        for(int i=0; i<pref.size(); i++){
            if(node->links[ pref[i] - 'a' ] == NULL){
                // cout<<pref[i]<<" "<<node->links[pref[i]-'a']<<endl;
                // cout<< "not present" <<endl;
                return 0;
            }
            // cout<<pref[i]<<" "<<node->links[pref[i]-'a']<<" not NULL"<<endl;
            node = node->links[ pref[i] - 'a' ];
        }
        if(isLastNode(node)){
            cout<<pref<<endl;
            return -1;
        }
        vector<string> store;
        rec(node, pref, store);
        // To print name only
        // for(int i=0; i<store.size(); i++) cout<<store[i]<<endl;
        // To print name along with contact
        for(int i=0; i<store.size(); i++) cout<<store[i]<<" - "<<dictname[store[i]]<<endl;
        return 1;
    }
};

struct ContactNode{
    ContactNode* links[10];
    bool flag = false;
};

class ContactTrie {
private: ContactNode *root;
public:
    ContactTrie(){
        root = new ContactNode(); 
    }
    
    int insert(string number) {
        ContactNode *node = root;
        for(int i=0; i<number.size(); i++){
            if( node->links[ number[i] - '0'] == NULL ){
                node->links[ number[i] - '0'] = new ContactNode();
            }
            node = node->links[ number[i] - '0'];
        }
        if(node->flag==true){
            // cout<<"Already present"<<endl;
            return -1;
        }
        node->flag = true;
        return 1;
    }

    bool search(string number) {
        ContactNode *node = root;
        for(int i=0; i<number.size(); i++){
            cout<< number[i]<<" "<<node->links[ number[i] - '0' ]<<endl;
            if( node->links[ number[i] - '0' ] == NULL ) return false;
            node = node->links[ number[i] - '0'];
        }
        if( node->flag == true ) return true;
        return false;
    }

    bool startsWith(string prefix) {
        ContactNode *node = root;
        for(int i=0; i<prefix.size(); i++){
            cout<< prefix[i]<<" "<<node->links[ prefix[i] - '0' ]<<endl;
            if( node->links[ prefix[i] - '0'] == NULL ) return false;
            node = node->links[ prefix[i] - '0'];
        }
        return true;
    }

    bool isLastNode(ContactNode* node){
        for(int i=0; i<10; i++){
            if(node->links[i]!=NULL) return false;
        }
        return true;
    }

    void rec(ContactNode* node, string number, vector<string>& store){
        if(node->flag == true){
            // cout<<"found flag as true "<<name<<endl;
            store.push_back(number);
        }
        for(int i=0; i<10; i++){
            // cout<<"looping for"<<i<<" "<<name<<endl;
            if(node->links[i]!=NULL){
                // cout<<"found "<<i<<" "<<name<<endl;
                number += (char)(i + '0');
                rec(node->links[i], number, store);
                // cout<<"going back to "<<i<<" "<<name<<endl;
                number.erase(number.end()-1);
            }
        }
        return;
    }
    void print(){
        ContactNode* node = root;
        vector<string> store;
        // cout<<"Start Printing "<<endl;
        rec(node, "", store);
        // To print contact only
        // for(int i=0; i<store.size(); i++) cout<<store[i]<<endl;
        // To print contact along with name
        for(int i=0; i<store.size(); i++) cout<<store[i]<<" - "<<dictnum[store[i]]<<endl;
    }
    int printpref(string pref){
        ContactNode* node = root;
        for(int i=0; i<pref.size(); i++){
            if(node->links[ pref[i] - '0' ] == NULL){
                // cout<<pref[i]<<" "<<node->links[pref[i]-'a']<<endl;
                // cout<< "not present" <<endl;
                return 0;
            }
            // cout<<pref[i]<<" "<<node->links[pref[i]-'a']<<" not NULL"<<endl;
            node = node->links[ pref[i] - '0' ];
        }
        if(isLastNode(node)){
            cout<<pref<<endl;
            return -1;
        }
        vector<string> store;
        rec(node, pref, store);
        // To print contact only
        // for(int i=0; i<store.size(); i++) cout<<store[i]<<endl;
        // To print contact along with name
        for(int i=0; i<store.size(); i++) cout<<store[i]<<" - "<<dictnum[store[i]]<<endl;
        return 1;
    }
};

int main(){
    freopen("in.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    NameTrie nametrie;
    ContactTrie contacttrie;
    int t;
    cin>>t;
    while(t--){
        int i;
        cin>>i;
        while(i--){
            string name;
            string contact;
            cin>>name;
            cin>>contact;
            dictname[name] = contact;
            dictnum[contact] = name;
            int n = nametrie.insert(name);
            if(n==-1) cout<<"Name already present"<<endl;
            int m = contacttrie.insert(contact);
            if(m==-1) cout<<"Contact already present"<<endl;
        }
        // cout<<trie.search("abc");
        // cout<<trie.startsWith("ab");
        nametrie.print();
        cout<<endl;
        nametrie.printpref("sh");
        cout<<endl;
        nametrie.printpref("him");
        cout<<endl;
        contacttrie.print();
        cout<<endl;
        contacttrie.printpref("6367");
        cout<<endl;
        contacttrie.printpref("86194");
        cout<<endl;
    }
    return 0;
}