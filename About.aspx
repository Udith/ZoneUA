<%@ Page Title="Zone UA | About Us" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="about.aspx.cs" Inherits="About" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="js/aboutJS.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container marketing">
        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <h2 class="featurette-heading">About this Web Site.<br />
                    <span class="text-muted">What it is for?</span></h2>
                <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive" data-src="/js/holder.js/500x500/auto" alt="Generic placeholder image">
            </div>
        </div>
    </div>
</asp:Content>

